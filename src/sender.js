const redirect = require('micro-redirect');
const { send } = require('micro');
const path = require('path');
const config = require('config');

const browserCache = config.get('browserCache');

const getTypeByUrl = resourceName => path.extname(resourceName).replace('.', '');

const getMimeType = (resource, options) => {
  const type = options.o === 'original'
    ? getTypeByUrl(resource.name)
    : options.o;
  return `image/${type}`;
};

const getCacheControlHeader = () => browserCache && `max-age=${browserCache.maxAge}`;

module.exports = {
  sendImage: (resource, options, res) => {
    switch (resource.type) {
      case 'buffer': {
        const cacheHeader = getCacheControlHeader();
        if (cacheHeader) {
          res.setHeader('cache-control', cacheHeader);
        }
        res.setHeader('Content-type', getMimeType(resource, options));
        return send(res, 200, resource.buffer);
      }
      case 'location':
        return redirect(res, 301, resource.location);
      default:
        throw new Error(`Invalid type of resource ${resource.type}`);
    }
  },
};
