const md5 = require('md5');
const PersistorFactory = require('../persistors');

const KEY_BASE = 'original';

module.exports = (config) => {
  let persistor;
  try {
    persistor = PersistorFactory.create(config.caches.input);
  } catch (e) {
    throw e;
  }

  const cache = {
    getKey: url => md5(`${KEY_BASE}_${url}`),

    getFileName: (url) => {
      const filename = cache.getKey(url.toString());
      return `${filename}`;
    },

    get: async (url) => {
      const resource = await persistor.read(cache.getFileName(url));
      return resource && {
        ...resource,
        name: cache.getFileName(url),
      };
    },

    set: async (url, buffer) => {
      const filename = cache.getFileName(url);
      return {
        ...(await persistor.save(filename, buffer)),
        name: filename,
      };
    },
  };

  return cache;
};
