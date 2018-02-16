const { getGravityFromParameter } = require('./gravity');

module.exports = (/* pipeline */) => async (width, height, gravity) => {
  const gravityValue = getGravityFromParameter(gravity, { acceptAuto: true });

  const operations = [
    {
      name: 'resize_fill',
      operation: 'resize',
      params: [width, height],
    },
    {
      name: 'resize_fill',
      operation: 'crop',
      params: gravityValue ? [gravityValue] : [],
    },
  ];

  return operations;
};

