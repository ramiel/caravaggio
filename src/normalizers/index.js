const rotateNormalizer = require('./rotate');
const flipNormalizer = require('./flip');
const blurNormalizer = require('./blur');
const resizeNormalizer = require('./resize');
const oNormalizer = require('./o');

const normalizers = {
  rotate: rotateNormalizer,
  flip: flipNormalizer,
  blur: blurNormalizer,
  resize: resizeNormalizer,
  o: oNormalizer,
};

module.exports = (options) => {
  const result = options.operations.reduce((acc, [name, params]) => {
    const normalized = normalizers[name]
      ? normalizers[name](params)
      : {};
    return {
      ...acc,
      ...normalized,
      operations: [
        ...acc.operations,
        ...(normalized.operations || []),
      ],
    };
  }, { operations: [] });

  return result;
};
