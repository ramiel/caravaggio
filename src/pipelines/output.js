const logger = require('../logger');
const { getPipelineOperationSortFunction } = require('../utils');

const OPERATION_ORDER = [
  'o',
  'q',
];
const sortFunction = getPipelineOperationSortFunction(OPERATION_ORDER);

const reducer = pipeline => (acc, { /* name, */ operation, params }) => {
  if (operation instanceof Function) {
    return operation(pipeline).reduce(reducer(pipeline), acc);
  }
  if (!acc.hasOperation(operation)) {
    throw new Error(`Invalid operation: ${operation}`);
  }
  logger.debug(`Applying output operation "${operation}" with parameters: ${JSON.stringify(params, null, '')}`);
  return acc.applyOperation(operation, ...params);
};

module.exports = pipeline => pipeline.getOptions().output
  .sort(sortFunction)
  .reduce(
    reducer(pipeline),
    pipeline,
  );

