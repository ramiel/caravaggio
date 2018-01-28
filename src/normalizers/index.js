const rotateNormalizer = require('./rotate');
const flipNormalizer = require('./flip');

const normalizers = {
  rotate: rotateNormalizer,
  flip: flipNormalizer,
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

