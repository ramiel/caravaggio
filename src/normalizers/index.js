const rotateNormalizer = require('./rotate');
const flipNormalizer = require('./flip');
const blurNormalizer = require('./blur');
const resizeNormalizer = require('./resize');

const normalizers = {
  rotate: rotateNormalizer,
  flip: flipNormalizer,
  blur: blurNormalizer,
  resize: resizeNormalizer,
};


module.exports = operations => operations.reduce((acc, [name, params]) => {
  const normalized = normalizers[name]
    ? normalizers[name](params)
    : [[name, params]];
  return [
    ...acc,
    ...normalized,
  ];
}, []);

