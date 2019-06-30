const CError = require('./errors/CError');
const { getLogger } = require('./logger');

const createError = (statusCode, message, webUri) => new CError(message, webUri, statusCode);
const emptyPlugins = { onRouteEntry: [] };
let loadedPlugins = null;

const pluginsLoader = (config, skipLoaded = false) => {
  const logger = getLogger();
  const { pluginPaths, pluginsDisabled } = config;
  if (pluginsDisabled) {
    return emptyPlugins;
  }
  if (loadedPlugins && !skipLoaded) {
    return loadedPlugins;
  }
  const plugins = Object.entries(config.plugins || {})
    .filter(([_, { disabled }]) => !disabled)
    .map(([name, { options = {} }]) => {
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const plugin = require(require.resolve(name, {
          paths: pluginPaths,
        }));
        const loaded = plugin({ options, logger, createError });
        logger.debug(`Loaded plugin ${name}`);
        return loaded;
      } catch (e) {
        logger.error(`Unable to load plugin ${name}`);
        throw e;
      }
    });

  loadedPlugins = plugins.reduce((acc, { onRouteEntry }) => ({
    ...acc,
    onRouteEntry: onRouteEntry ? [...acc.onRouteEntry, onRouteEntry] : acc.onRouteEntry,
  }), emptyPlugins);

  return loadedPlugins;
};

module.exports = pluginsLoader;
