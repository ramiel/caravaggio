const normalizer = require('./normalizers');

const parser = {

  parseOptions: (opts) => {
    const optsAsArray = opts.split(',');
    const options = {
      o: 'original',
      operations: normalizer(optsAsArray.map(o => o.split('_'))),
      rawNormalizedOptions: opts,
    };
    return options;
  },
};

module.exports = parser;

