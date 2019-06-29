const cohercer = require('../cohercer');

module.exports = (value) => {
  const operation = value && cohercer(value, 'Flip accepts "x" or "y" as values.', 'flip.html')
    .toString()
    .enum(['x', 'y'])
    .value()
    .toLowerCase();

  const method = !operation || operation === 'x' ? 'flop' : 'flip';

  return {
    transformations: [
      {
        name: 'flip',
        fn: async sharp => sharp[method](),
        params: [true],
      },
    ],
  };
};
