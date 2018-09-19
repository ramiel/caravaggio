const path = require('path');
const md5 = require('md5');
const PersistorFactory = require('../persistors');

module.exports = (config) => {
  let persistor;

  try {
    persistor = PersistorFactory.create(config.get('caches.output'));
  } catch (e) {
    throw e;
  }

  const cache = {
    getKey: (url, rawOptions) => md5(`url_${url}_options_${rawOptions}`),

    getFileName: (url, options) => {
      const filename = cache.getKey(url.toString(), options.rawNormalizedOptions);
      const extension = options.o === 'original'
        ? path.extname(url.pathname)
        : `.${options.o}`;
      return `${filename}${extension}`;
    },

    get: async (url, options) => {
      const filename = cache.getFileName(url, options);
      const resource = await persistor.read(filename);
      return resource && {
        ...resource,
        name: filename,
      };
    },

    set: async (url, options, buffer) => {
      const filename = cache.getFileName(url, options);
      return {
        ...(await persistor.save(filename, buffer)),
        name: filename,
      };
    },
  };

  return cache;
};
