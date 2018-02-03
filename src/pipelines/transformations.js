const logger = require('../logger');

module.exports = (url, options) => pipeline => options.transformations.reduce(
  (acc, { /* name,  */operation, params }) => {
    if (!acc[operation]) {
      throw new Error(`Invalid transformation: ${operation}`);
    }
    logger.debug(`Applying transformation "${operation}" with parameters: ${JSON.stringify(params, null, '  ')}`);
    return acc[operation](...params);
  },
  pipeline,
);
