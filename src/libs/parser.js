const parser = {

  parseOptions: (opts) => {
    const defaultOptions = {};
    const parsedOptions = {};
    opts.split(',').forEach((option) => {
      const [key, param] = option.split('_');
      parsedOptions[key] = param;
    });
    const options = {
      ...defaultOptions,
      ...parsedOptions,
    };
    return options;
  },

  createCallStack: (options) => {
    const callStack = Object.entries(parser.parseOptions(options)).map(([option, param]) => {
      switch (option.toLowerCase()) {
        case 'rotate':
          return ['rotate', (param && param * 1) || null];

        default:
          return null;
      }
    });

    return callStack;
  },
};

module.exports = parser;

