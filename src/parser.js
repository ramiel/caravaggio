const normalizerFactory = require('./normalizers');

const BLOCK_DELIMITER = '"';
const BLOCK_DELIMITER_REMOVER_REGEXP = new RegExp(`^${BLOCK_DELIMITER}|${BLOCK_DELIMITER}$`, 'mg');

/**
 * If the option is in the format a_b_"c_d" it mu be splitted in "a", "b, "c_d"
 * This function takes care of joining all the parameter splitted by a dumb split
 * @param {Array} options
 */
const joinOptionsSplittedAMongSeparator = options => options.reduce((acc, opt) => {
  if (Array.isArray(acc[acc.length - 1])) {
    let lastOpt = [
      ...acc.slice(acc.length - 1)[0],
      opt,
    ];
    if (opt.lastIndexOf(BLOCK_DELIMITER) === opt.length - 1) {
      lastOpt = lastOpt.join('_').replace(BLOCK_DELIMITER_REMOVER_REGEXP, '');
    }
    return [
      ...acc.slice(0, acc.length - 1),
      lastOpt,
    ];
  }

  if (opt.indexOf(BLOCK_DELIMITER) === 0) {
    if (opt.length > 1 && opt.lastIndexOf(BLOCK_DELIMITER) === opt.length - 1) {
      return [
        ...acc,
        opt.replace(BLOCK_DELIMITER_REMOVER_REGEXP, ''),
      ];
    }
    return [
      ...acc,
      [opt],
    ];
  }


  return [
    ...acc,
    opt,
  ];
}, []);

module.exports = (config) => {
  const normalizer = normalizerFactory(config);
  return {

    parseOptions: (opts) => {
      const optsAsArray = opts.split(',');
      const options = {
        o: 'original',
        operations: optsAsArray.map(
          o => joinOptionsSplittedAMongSeparator(o.split('_')),
        ),
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

