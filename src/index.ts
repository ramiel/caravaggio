import { Config } from './config/default';
import createLogger from './logger';
import pluginLoader, { PluginManager } from './pluginLoader/pluginLoader';
import { Logger } from 'pino';
import { router, get } from 'microrouter';
import indexRoute from './routes';
import { compose } from './utils/misc';
import errorHandler from './middlewares/errorHandler';
import faviconRoute from './routes/favicon';

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
        ...pluginManager.getMiddlewares()
      )(indexRoute(context))
    )
  );
};

export default caravaggio;
