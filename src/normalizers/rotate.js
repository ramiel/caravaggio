const cohercer = require('../cohercer');
const { getColorFromParameter } = require('./resize/color');

module.exports = (value, rawColor) => {
  const angle = cohercer(value, 'Angle must be a number', 'rotate.html')
    .toInt()
    .value();

  const params = [angle];
  let background;
  if (rawColor) {
    background = (rawColor && getColorFromParameter(rawColor));
    params.push({ background });
  }


  return {
    transformations: [
      {
        name: 'rotate',
        fn: async sharp => sharp.rotate(...params),
        params,
      },
    ],
  };
};

