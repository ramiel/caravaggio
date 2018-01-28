const rotateNormalizer = require('./rotate');

const normalizers = {
  rotate: rotateNormalizer,
};
module.exports = parsedOptions => Object.keys(parsedOptions).reduce((acc, operation) => ({
  ...acc,
  [operation]: normalizers[operation](parsedOptions[operation]),
}), {});
