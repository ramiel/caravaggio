const { getLogger } = require('../logger');
const { stringifyParams } = require('../utils');

const reducer = pipeline => async (acc, { name, fn, params }) => {
  const logger = getLogger();
  logger.debug(`Applying output operation "${name}":"${stringifyParams(params)}"`);
  return acc.then(sharp => fn(sharp, pipeline));
};

module.exports = pipeline => sharp => pipeline.getOptions().transformations
  .reduce(
    reducer(pipeline),
    Promise.resolve(sharp),
  );
