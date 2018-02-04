const logger = require('../logger');

const reducer = pipeline => async (acc, { /* name, */ operation, params }) => {
  if (operation instanceof Function) {
    return (await operation(pipeline)).reduce(reducer(pipeline), acc);
  }
  if (!acc.hasOperation(operation)) {
    throw new Error(`Invalid operation: ${operation}`);
  }
  logger.debug(`Applying transformation "${operation}" with parameters: ${JSON.stringify(params, null, '')}`);
  return acc.applyOperation(operation, ...params);
};

module.exports = pipeline => pipeline.getOptions().transformations
  .reduce(
    reducer(pipeline),
    pipeline,
  );
