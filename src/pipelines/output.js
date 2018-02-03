const { getPipelineOperationSortFunction } = require('../utils');

const OPERATION_ORDER = [
  'o',
  'q',
];
const sortFunction = getPipelineOperationSortFunction(OPERATION_ORDER);

const reducer = (url, options) => (acc, { /* name, */ operation, params }) => {
  if (operation instanceof Function) {
    return operation(url, options).reduce(reducer(url, options), acc);
  }
  if (!acc[operation]) {
    throw new Error(`Invalid operation: ${operation}`);
  }
  console.log(`Applying output operation "${operation}" with parameters: ${JSON.stringify(params, null, '')}`);
  return acc[operation](...params);
};

module.exports = (url, options) => pipeline => options.output
  .sort(sortFunction)
  .reduce(
    reducer(url, options),
    pipeline,
  );

