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

    exists: (url, options) => persistor.exists(cache.getFileName(url, options)),

    get: (url, options) => persistor.read(cache.getFileName(url, options)),

    set: (url, options, buffer) => persistor.save(cache.getFileName(url, options), buffer),

  };
  return cache;
};
