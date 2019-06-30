const { getLogger } = require('../logger');
const { getPipelineOperationSortFunction, stringifyParams } = require('../utils');

const OPERATION_ORDER = [
  'o',
  'q',
  'progressive',
];
const sortFunction = getPipelineOperationSortFunction(OPERATION_ORDER);

const reducer = pipeline => async (acc, { name, fn, params }) => {
  const logger = getLogger();
  logger.debug(`Applying output operation "${name}":"${stringifyParams(params)}"`);
  return acc.then(sharp => fn(sharp, pipeline));
};

module.exports = pipeline => sharp => pipeline.getOptions().output
  .sort(sortFunction)
  .reduce(
    reducer(pipeline),
    Promise.resolve(sharp),
  );

