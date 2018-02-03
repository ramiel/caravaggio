const logger = require('../logger');

module.exports = (/* url, options */) => (pipeline) => {
  logger.debug('pretending applying input operations');
  return pipeline;
};

