const { URL } = require('url');
const { getLogger } = require('../logger');
const parser = require('../parser');
const pipelineFactory = require('../pipelines');
const sender = require('../sender');

module.exports = (config) => {
  const { parseOptions } = parser(config);
  const { sendImage } = sender(config);
  const pipeline = pipelineFactory(config);
  const logger = getLogger();

  return cache => async (req, res) => {
    try {
      const options = parseOptions(decodeURIComponent(req.params._[0]));
      const url = new URL(decodeURIComponent(req.params._[1]));
      const resource = await cache.get(url, options);
      if (resource) {
        logger.debug(`Cache hit for resource ${url.toString()} with options ${options.rawNormalizedOptions}`);
        await sendImage(resource, options, req, res);
        return;
      }

      // If the resource is missing, let's create it and serve
      const imageBuffer = await pipeline.convert(url, options);
      const createdResource = await cache.set(url, options, imageBuffer);
      await sendImage(createdResource, options, req, res);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  };
};
