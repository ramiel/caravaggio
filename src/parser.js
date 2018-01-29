const normalizer = require('./normalizers');

const parser = {

  parseOptions: (opts) => {
    const optsAsArray = opts.split(',');
    const options = {
      o: 'original',
      operations: optsAsArray.map(o => o.split('_')),
      rawNormalizedOptions: opts,
    };
    return normalizer(options);
  },
};

module.exports = parser;

