const normalizer = require('./normalizers');

const parser = {

  parseOptions: (opts) => {
    const defaultOptions = {
      o: 'original',
    };
    const parsedOptions = {};
    const optsAsArray = opts.split(',');
    optsAsArray.forEach((option) => {
      const [key, param] = option.split('_');
      parsedOptions[key] = param;
    });
    const options = {
      ...defaultOptions,
      ...parsedOptions,
      rawNormalizedOptions: optsAsArray.sort().join(''),
    };
    return normalizer(options);
  },

  createCallStack: parsedOptions => Object.entries(parsedOptions).reduce(
    (acc, [option, param]) => {
      let operationCall;
      switch (option.toLowerCase()) {
        case 'rotate':
          operationCall = ['rotate', param || null];
          break;
        default:
          operationCall = null;
      }
      if (!operationCall) return acc;
      return [
        ...acc,
        operationCall,
      ];
    },
    [],
  ),
};

module.exports = parser;

