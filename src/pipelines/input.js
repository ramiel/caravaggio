const logger = require('../logger');

module.exports = (pipeline) => {
  logger.debug('No input operations for the moment, skipping');
  return Promise.resolve(pipeline);
};

