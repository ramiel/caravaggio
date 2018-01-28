const path = require('path');
const md5 = require('md5');

module.exports = (persistor) => {
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
      const resource = await persistor.read(cache.getFileName(url, options));
      return resource && {
        ...resource,
        name: cache.getFileName(url, options),
      };
    },

    set: async (url, options, buffer) => ({
      ...(await persistor.save(cache.getFileName(url, options), buffer)),
      name: cache.getFileName(url, options),
    }),
  };

  return cache;
};
