const { URL } = require('url');
const { send } = require('micro');
const redirect = require('micro-redirect');
const { parseOptions } = require('../parser');

module.exports = cache => async (req, res) => {
  try {
    const url = new URL(req.params._);
    const options = parseOptions(req.params.options);
    const resource = await cache.get(url, options);
    if (resource) {
      switch (resource.type) {
        case 'buffer':
          return send(res, 200, resource.buffer);
        case 'location':
          return redirect(res, 301, resource.location);
        default:
          break;
      }
    }
    // start the conversion and return the old file
    // return redirect(res, 301, url.toString());
    return send(res, 200, 'File not converted yet');
  } catch (e) {
    send(res, e.statusCode || 500);
    throw (e);
  }
};
