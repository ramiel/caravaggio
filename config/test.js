module.exports = {
  logger: {
    level: 'fatal',
  },
  defaultTransformations: [],
  errors: 'plain',
  compress: false,

  caches: {
    output: {
      type: 'none',
      options: {},

    },
    input: {
      type: 'memory',
      options: {},
    },
  },
};

