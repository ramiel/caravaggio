const logger = require('../logger');

module.exports = (pipeline) => {
  logger.debug('pretending applying input operations');
  return Promise.resolve(pipeline);
};

