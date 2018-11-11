const logger = require('../logger');
const { stringifyParams } = require('../utils');

const reducer = async (acc, { name, operation, params }) => acc.then(async (pipeline) => {
  if (operation instanceof Function) {
    return (await operation(pipeline)).reduce(reducer, Promise.resolve(pipeline));
  }
  // console.log(acc, operation);
  if (!pipeline.hasOperation(operation)) {
    throw new Error(`Invalid operation: ${name}:${operation}`);
  }
  logger.debug(`Applying transformation "${name}:${operation}" with parameters: ${stringifyParams(params)}`);
  return pipeline.applyOperation(operation, ...params);
});

module.exports = pipeline => pipeline.getOptions().transformations
  .reduce(
    reducer,
    Promise.resolve(pipeline),
  );
