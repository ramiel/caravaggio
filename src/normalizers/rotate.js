const cohercer = require('../cohercer');

module.exports = (value) => {
  const angle = cohercer(value, 'Angle must be multiple of 90°')
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

