const cohercer = require('../cohercer');
const { buildDocumentationLink } = require('../utils');

module.exports = (value) => {
  const operation = value && cohercer(value, `Flip accepts "x" or "y" as values.
See ${buildDocumentationLink('flip.html')}
  `)
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
