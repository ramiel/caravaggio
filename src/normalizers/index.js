const config = require('config');
const blurNormalizer = require('./blur');
const cropNormalizer = require('./crop');
const flipNormalizer = require('./flip');
const oNormalizer = require('./o');
const qNormalizer = require('./q');
const resizeNormalizer = require('./resize');
const rotateNormalizer = require('./rotate');
const progressiveNormalizer = require('./progressive');

const normalizers = {
  blur: blurNormalizer,
  crop: cropNormalizer,
  flip: flipNormalizer,
  o: oNormalizer,
  q: qNormalizer,
  resize: resizeNormalizer,
  rotate: rotateNormalizer,
  progressive: progressiveNormalizer,
};

const defaultTransformations = config.get('defaultTransformations');

const findSameNameOperation = name => element => element[0] === name;

const addDefaultsTransformations = operations => defaultTransformations
  .reduce(
    (acc, [name, params]) => {
      if (acc.findIndex(findSameNameOperation(name)) !== -1) {
        return acc;
      }
      return [
        ...acc,
        [name, params],
      ];
    },
    operations,
  );

module.exports = (options) => {
  const result = addDefaultsTransformations(options.operations).reduce((acc, [name, params]) => {
    const normalized = normalizers[name]
      ? normalizers[name](params)
      : {};
    return {
      ...acc,
      ...normalized,
      input: [
        ...acc.input,
        ...(normalized.input || []),
      ],
      transformations: [
        ...acc.transformations,
        ...(normalized.transformations || []),
      ],
      output: [
        ...acc.output,
        ...(normalized.output || []),
      ],
    };
  }, {
    ...options, input: [], transformations: [], output: [],
  });

  return result;
};
