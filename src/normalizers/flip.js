const cohercer = require('../cohercer');

module.exports = (value) => {
  const operation = value && cohercer(value, 'Accepted values are "x" and "y"')
    .toString()
    .enum(['x', 'y'])
    .value()
    .toLowerCase();

  return {
    transformations: [
      {
        name: 'flip',
        operation: !operation || operation === 'x' ? 'flop' : 'flip',
        params: [true],
      },
    ],
  };
};
