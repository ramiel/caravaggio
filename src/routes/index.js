const { URL } = require('url');
const { createError } = require('micro');
const logger = require('../logger');
const parser = require('../parser');
const pipeline = require('../pipelines');
const { sendImage } = require('../sender');

module.exports = (config) => {
  const { parseOptions } = parser(config);

  return cache => async (req, res) => {
    try {
      const options = parseOptions(req.params._[0]);
      const url = new URL(decodeURIComponent(req.params._[1]));
      const resource = await cache.get(url, options);
      if (resource) {
        logger.debug(`Cache hit for resource ${url.toString()} with options ${options.rawNormalizedOptions}`);
        await sendImage(resource, options, res);
        return;
      }

      // If the resource is missing, let's create it and serve
      const imageBuffer = await pipeline.convert(url, options);
      const createdResource = await cache.set(url, options, imageBuffer);
      await sendImage(createdResource, options, res);
    } catch (e) {
      logger.error(e);
      throw createError(e.statusCode, e.message);
    }
  };
};
