const blurNormalizer = require('./blur');
const cropNormalizer = require('./crop');
const flipNormalizer = require('./flip');
const oNormalizer = require('./o');
const qNormalizer = require('./q');
const resizeNormalizer = require('./resize');
const rotateNormalizer = require('./rotate');

const normalizers = {
  blur: blurNormalizer,
  crop: cropNormalizer,
  flip: flipNormalizer,
  o: oNormalizer,
  q: qNormalizer,
  resize: resizeNormalizer,
  rotate: rotateNormalizer,
};

module.exports = (options) => {
  const result = options.operations.reduce((acc, [name, params]) => {
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
