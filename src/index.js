const config = require('config');
// const micro = require('micro');
const { router, get } = require('microrouter');
const indexRoute = require('./routes/index');
const Cache = require('./cache');

const persistorType = config.get('persistor.type');
const persistorOptions = config.get('persistor.options');

let persistor;
switch (persistorType) {
  case 'file':
    // eslint-disable-next-line global-require
    persistor = require('./persistors/file')(persistorOptions);
    break;

  case 'memory':
    // eslint-disable-next-line global-require
    persistor = require('./persistors/memory')(persistorOptions);
    break;

  default:
    throw new Error(`Invalid persistor ${persistorType}. Check your configuration`);
}

module.exports = router(get('/:options/*', indexRoute(Cache(persistor))));
