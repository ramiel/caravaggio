const logger = require('../logger');

module.exports = pipeline => pipeline.getOptions().transformations.reduce(
  (acc, { /* name,  */operation, params }) => {
    if (!acc.hasOperation(operation)) {
      throw new Error(`Invalid transformation: ${operation}`);
    }
    logger.debug(`Applying transformation "${operation}" with parameters: ${JSON.stringify(params, null, '  ')}`);
    return acc.applyOperation(operation, ...params);
  },
  pipeline,
);
