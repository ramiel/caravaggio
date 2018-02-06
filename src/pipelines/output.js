const logger = require('../logger');
const { getPipelineOperationSortFunction } = require('../utils');

const OPERATION_ORDER = [
  'o',
  'q',
  'progressive',
];
const sortFunction = getPipelineOperationSortFunction(OPERATION_ORDER);

const reducer = async (acc, { name, operation, params }) => acc.then(async (pipeline) => {
  if (operation instanceof Function) {
    return (await operation(pipeline)).reduce(reducer, Promise.resolve(pipeline));
  }
  if (!pipeline.hasOperation(operation)) {
    throw new Error(`Invalid operation: ${operation}`);
  }
  logger.debug(`Applying output operation "${name} -> ${operation}" with parameters: ${JSON.stringify(params, null, '')}`);
  return pipeline.applyOperation(operation, ...params);
});

module.exports = pipeline => pipeline.getOptions().output
  .sort(sortFunction)
  .reduce(
    reducer,
    Promise.resolve(pipeline),
  );

