const config = require('config');
const path = require('path');
const router = require('./router');

const persistorType = config.get('persistor.type');
const persistorOptions = config.get('persistor.options');
const whitelist = config.get('whitelist');

let persistor;

try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  persistor = require(path.join(__dirname, 'persistors', persistorType))(persistorOptions);
} catch (e) {
  throw new Error(`Invalid persistor ${persistorType}. Check your configuration: ${e.message}`);
}

module.exports = router(config)({ persistor, whitelist });

