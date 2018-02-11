const cohercer = require('../cohercer');
const { buildDocumentationLink } = require('../utils');

module.exports = (value) => {
  const angle = cohercer(value, `Angle must be multiple of 90°.
See ${buildDocumentationLink('rotate.html')}
  `)
    .toInt()
    .multipleOf(90)
    .value();

  return {
    transformations: [
      {
        name: 'rotate',
        operation: 'rotate',
        params: [angle],
      },
    ],
  };
};

