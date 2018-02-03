const sharp = require('sharp');

const getGravityOrStrategy = gravityOrStrategy => (sharp.gravity[gravityOrStrategy] !== undefined
  ? sharp.gravity[gravityOrStrategy]
  : sharp.strategy[gravityOrStrategy]);

const getGravityCrop = ([width, height, gravity]) => [
  {
    name: 'crop',
    operation: 'resize',
    params: [parseInt(width, 10), parseInt(height, 10)],
  },
  {
    name: 'crop',
    operation: 'crop',
    params: [getGravityOrStrategy(gravity)],
  },

];

const getCoordinatesCrop = ([left, top, width, height]) => [
  {
    name: 'crop',
    operation: 'extract',
    params: [{
      left: parseInt(left, 10),
      top: parseInt(top, 10),
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    }],
  },
];

module.exports = (value) => {
  const params = value.split('x');
  if (params.length === 3) {
    return {
      transformations: getGravityCrop(params),
    };
  }
  if (params.length === 4) {
    return {
      transformations: getCoordinatesCrop(params),
    };
  }
};

