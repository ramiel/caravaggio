import type { Config } from '../config/default';
import { tryEach } from '../utils/flow';
import webImageLoader from '../basePlugins/webImageLoader';
import { Logger } from 'pino';
import { AugmentedRequestHandler } from 'microrouter';
import domainWhitelistFactory from '../basePlugins/domainWhitelist';
import flatten from 'lodash/flatten';

export const PLUGIN_IGNORE_RESULT = Symbol('PLUGIN_IGNORE_RESULT');

export interface Plugin {
  inputImageLoader?: (
    imageUrl: string
  ) => Promise<Buffer | typeof PLUGIN_IGNORE_RESULT | null>;
  getMiddlewares?: () => Array<
    (next: AugmentedRequestHandler) => AugmentedRequestHandler
  >;
}

export type PluginConstructor<TPluginOptions> = (opt: {
  config: Config;
  pluginOptions?: TPluginOptions;
  PLUGIN_IGNORE_RESULT: typeof PLUGIN_IGNORE_RESULT;
}) => Plugin;

interface PluginDescriptor {
  name: string;
  instance: Plugin;
}

export type PluginManager = Required<Plugin>;

const pluginLoader = (config: Config, logger?: Logger): PluginManager => {
  let loadedPlugins: PluginDescriptor[] = [
    {
      name: 'webImageLoader',
      instance: webImageLoader({ config, PLUGIN_IGNORE_RESULT }),
    },
    {
      name: 'domainWhitelist',
      instance: domainWhitelistFactory({
        config,
        PLUGIN_IGNORE_RESULT,
        pluginOptions: { whitelist: config.whitelist },
      }),
    },
  ];

  if (config.plugins) {
    const { paths, plugins = {} } = config.plugins;

    loadedPlugins = Object.entries(plugins)
      .filter(([, { disabled }]) => !disabled)
      .reduce<PluginDescriptor[]>((acc, opt) => {
        const [name, { options }] = opt;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const plugin = require(require.resolve(name, {
          paths,
        })) as PluginConstructor<unknown>;

        return [
          ...acc,
          {
            name,
            instance: plugin({
              config,
              pluginOptions: options,
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
          '[PLUGIN:inputImageLoader] failed. No plugin is able to handle this operation'
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
