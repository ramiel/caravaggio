const config = require('./config');
const caravaggio = require('./index');
const { createLogger } = require('./logger');

createLogger(config);

module.exports = caravaggio(config);
