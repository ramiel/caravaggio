const { getGravityFromParameter } = require('./gravity');

module.exports = (/* pipeline */) => async (width, height, gravity) => {
  const gravityValue = getGravityFromParameter(gravity, { acceptAuto: true });

  const operations = [
    {
      name: 'resize_fill',
      operation: 'resize',
      params: [width, height, { fit: 'cover', position: gravityValue }],
    },
  ];

  return operations;
};

