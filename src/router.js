const { router, get } = require('microrouter');
const indexRoute = require('./routes/index');
const favicon = require('./routes/favicon');
const Cache = require('./caches/output');
const errorHandler = require('./middlewares/errorHandler');
const domainWhitelist = require('./middlewares/domainWhitelist');
const pluginsLoader = require('./pluginsLoader');
const { compose } = require('./utils');

module.exports = (config) => {
  const availablePlugins = pluginsLoader(config);

  return ({ whitelist }) => router(
    get('/favicon.ico', favicon),
    get(
      '/*/*',
      compose(
        errorHandler(config),
        domainWhitelist(whitelist),
        ...availablePlugins.onRouteEntry,
      )(indexRoute(config)(Cache(config))),
    ),
  );
};
