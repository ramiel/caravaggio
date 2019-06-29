const cohercer = require('../cohercer');
const { getOutputType } = require('./utils');

module.exports = (value) => {
  const progressive = cohercer(value, 'Progressive value is not valid.', 'progressive.html')
    .toBool()
    .value();
  const fn = async (sharp, pipeline) => {
    const format = await getOutputType(sharp, pipeline);
    switch (format) {
      case 'jpeg':
      case 'jpg':
        return sharp.jpeg({ progressive });
      case 'png':
        return sharp.png({ progressive });

      default:
        return sharp;
    }
  };

  return {
    output: [{
      name: 'progressive',
      fn,
      params: [progressive],
    }],
  };
};

