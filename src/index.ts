import { get, router } from 'microrouter';
import { Logger } from 'pino';
import { Config } from './config/default';
import createLogger from './logger';
import errorHandler from './middlewares/errorHandler';
import pluginLoader, { PluginManager } from './pluginLoader/pluginLoader';
import indexRoute from './routes';
import faviconRoute from './routes/favicon';
import { compose } from './utils/misc';

export { Config };

export interface Context {
  config: Config;
  logger: Logger;
  pluginManager: PluginManager;
}

export const caravaggio = (config: Config) => {
  const logger = createLogger(config);
  const pluginManager = pluginLoader(config, logger);

  const context: Context = {
    config,
    logger,
    pluginManager,
  };

  return router(
    get('/favicon.ico', faviconRoute),
    get(
      '/**',
      compose(
        errorHandler(context),
        ...pluginManager.getMiddlewares(),
      )(indexRoute(context)),
    ),
  );
};

export default caravaggio;
