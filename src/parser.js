const normalizerFactory = require('./normalizers');

module.exports = (config) => {
  const normalizer = normalizerFactory(config);
  return {

    parseOptions: (opts) => {
      const optsAsArray = opts.split(',');
      const options = {
        o: 'original',
        operations: optsAsArray.map(o => o.split('_')),
        rawNormalizedOptions: opts,
      };
      try {
        return normalizer(options);
      } catch (e) {
        throw e;
      }
    },
  };
};

