const redirect = require('micro-redirect');
const { send } = require('micro');
const path = require('path');
const config = require('config');
const sharp = require('sharp');

const browserCache = config.get('browserCache');

const getTypeByUrl = resourceName => path.extname(resourceName)
  .replace('.', '')
  .replace('jpg', 'jpeg');

const getTypeByMetadata = async resource => sharp(resource.buffer)
  .metadata()
  .then(({ format }) => format);

const getTypeByResource = async (resource) => {
  const extension = getTypeByUrl(resource.name);
  if (!extension) {
    return getTypeByMetadata(resource);
  }
  return extension;
};

const getMimeType = async (resource, options) => {
  const type = options.o === 'original'
    ? await getTypeByResource(resource)
    : options.o;
  return `image/${type}`;
};

const getCacheControlHeader = () => browserCache && `max-age=${browserCache.maxAge}`;

module.exports = {
  sendImage: async (resource, options, res) => {
    switch (resource.type) {
      case 'buffer': {
        const cacheHeader = getCacheControlHeader();
        if (cacheHeader) {
          res.setHeader('cache-control', cacheHeader);
        }
        res.setHeader('Content-type', await getMimeType(resource, options));
        return send(res, 200, resource.buffer);
      }
      case 'location':
        return redirect(res, 301, resource.location);
      default:
        throw new Error(`Invalid type of resource ${resource.type}`);
    }
  },
};
