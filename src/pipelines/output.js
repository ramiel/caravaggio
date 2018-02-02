const { getPipelineOperationSortFunction } = require('../utils');

const OPERATION_ORDER = [
  'o',
  'q',
];
const sortFunction = getPipelineOperationSortFunction(OPERATION_ORDER);
module.exports = (url, options) => pipeline => options.output
  .sort(sortFunction)
  .reduce(
    (acc, { /* name, */ operation, params }) => {
      if (!acc[operation]) {
        throw new Error(`Invalid operation: ${operation}`);
      }
      console.log(`Applying output operation "${operation}" with parameters: ${params}`);
      return acc[operation](...params);
    },
    pipeline,
  );

