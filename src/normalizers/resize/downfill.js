const { getGravityFromParameter } = require('./gravity');

module.exports = (/* pipeline */) => async (width, height, gravity) => {
  const gravityValue = getGravityFromParameter(gravity, { acceptAuto: true });

  const operations = [
    {
      name: 'resize_downfill',
      operation: 'resize',
      params: [width, height],
    },
    {
      name: 'resize_downfill',
      operation: 'crop',
      params: gravityValue ? [gravityValue] : [],
    },
    {
      name: 'resize_downfill',
      operation: 'withoutEnlargement',
      params: [],
    },
  ];

  return operations;
};

