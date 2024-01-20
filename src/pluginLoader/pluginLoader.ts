import type { Config } from '../config/default';
import { tryEach } from '../utils/flow';
import webImageLoader from '../basePlugins/webImageLoader';
import { Logger } from 'pino';
import { AugmentedRequestHandler, ServerRequest } from 'microrouter';
import domainWhitelistFactory from '../basePlugins/domainWhitelist';
import flatten from 'lodash/flatten';

export const PLUGIN_IGNORE_RESULT = Symbol('PLUGIN_IGNORE_RESULT');

export interface Plugin {
  urlTransform?: (url: string, req: ServerRequest) => Promise<string>;
  inputImageLoader?: (
    imageUrl: string
  ) => Promise<Buffer | typeof PLUGIN_IGNORE_RESULT | null>;
  getMiddlewares?: () => Array<
    (next: AugmentedRequestHandler) => AugmentedRequestHandler
  >;
}

export type PluginConstructor = (opt: {
  config: Config;
  PLUGIN_IGNORE_RESULT: typeof PLUGIN_IGNORE_RESULT;
}) => Plugin;

// export type PluginConstructor<TPluginOptions = unknown> = (
//   pOpt?: TPluginOptions
// ) => PluginSecondaryConstructor;

interface PluginDescriptor {
  name: string;
  instance: Plugin;
}

export type PluginManager = Required<Plugin>;

const pluginLoader = (config: Config, logger?: Logger): PluginManager => {
  let loadedPlugins: PluginDescriptor[] = [
    {
      name: 'webImageLoader',
      instance: webImageLoader()({ config, PLUGIN_IGNORE_RESULT }),
    },
    {
      name: 'domainWhitelist',
      instance: domainWhitelistFactory({ whitelist: config.whitelist })({
        config,
        PLUGIN_IGNORE_RESULT,
      }),
    },
  ];

  if (config.plugins) {
    const { paths, plugins = [] } = config.plugins;

    loadedPlugins = plugins
      .filter((plugin) => !plugin.disabled)
      .reduce<PluginDescriptor[]>((acc, { name, instance, options }) => {
        let plugin: PluginConstructor;
        if (instance) {
          plugin = instance;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const loaded = require(
            require.resolve(name, {
              paths,
            })
          );
          plugin = loaded(options);
        }
        return [
          ...acc,
          {
            name,
            instance: plugin({
              config,
              PLUGIN_IGNORE_RESULT,
            }),
          },
        ];
      }, loadedPlugins);
  }

  const getFnsFromPlugins = <K extends keyof PluginManager>(fn: K) =>
    loadedPlugins
      .map(({ instance }) => instance[fn])
      .filter((f): f is PluginManager[K] => f !== undefined);

  const onPluginError = (e: Error) => {
    logger?.debug(e);
    logger?.debug('Trying next plugin');
  };

  return {
    urlTransform: async (url, req) => {
      const fns = getFnsFromPlugins('urlTransform');
      if (fns.length === 0) return url;
      try {
        const result = await tryEach(fns, {
          onError: onPluginError,
          ignoreResult: (r) => r === PLUGIN_IGNORE_RESULT,
        })(url, req);
        return result || url;
      } catch (e) {
        return url;
      }
    },
    inputImageLoader: async (imageUrl) => {
      const fns = getFnsFromPlugins('inputImageLoader');
      try {
        const result = await tryEach(fns, {
          onError: onPluginError,
          ignoreResult: (r) => r === PLUGIN_IGNORE_RESULT,
        })(imageUrl);
        return result;
      } catch (e) {
        throw new Error(
          `[PLUGIN:inputImageLoader] failed. No plugin is able to download "${imageUrl}"`
        );
      }
    },
    getMiddlewares: () => {
      const middlewares = getFnsFromPlugins('getMiddlewares');
      return flatten(middlewares.map((m) => m()));
    },
  };
};

export default pluginLoader;
