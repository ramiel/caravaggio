const { URL } = require('url');
const { send } = require('micro');
const { parseOptions } = require('../parser');
const pipeline = require('../pipeline');
const { sendImage } = require('../sender');

module.exports = cache => async (req, res) => {
  try {
    const url = new URL(req.params._);
    const options = parseOptions(req.params.options);
    const resource = await cache.get(url, options);
    if (resource) {
      sendImage(resource, options, res);
      return;
    }

    // If the resource is missing, let's create it and serve
    const imageBuffer = await pipeline.convert(url, options);
    const createdResource = await cache.set(url, options, imageBuffer);
    sendImage(createdResource, options, res);
  } catch (e) {
    console.error(e);
    send(res, e.statusCode || 500, e.message);
  }
};
