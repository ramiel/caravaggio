const { getLogger } = require('../logger');

const logger = getLogger();

module.exports = (pipeline) => {
  logger.debug('No input operations for the moment, skipping');
  return Promise.resolve(pipeline);
};

