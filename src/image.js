const fetch = require('node-fetch');
const sharp = require('sharp');
const InputCacheFactory = require('./caches/input');
const { getLogger } = require('./logger');


module.exports = (config) => {
  const logger = getLogger();
  const cache = InputCacheFactory(config);
  sharp.cache(config.sharp.cache);

  const Image = {
    get: async (url) => {
      const resource = await cache.get(url);
      if (resource) {
        logger.debug(`Input cache hit for resource ${url}.`);
        return resource.buffer;
      }

      logger.debug(`Download image ${url}`);
      return fetch(url)
        .then(body => body.buffer())
        .then(buffer => cache.set(url, buffer))
        .then(({ buffer }) => buffer);
    },

    getImageHandler: url => Image.get(url)
      .then(buffer => sharp(buffer)),
  };

  return Image;
};
