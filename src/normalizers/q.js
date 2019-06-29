const cohercer = require('../cohercer');
const { getOutputType } = require('./utils');


const normalizeQ = value => Math.round((value * 80) / 100);

module.exports = (value) => {
  const v = cohercer(value, 'Quality must be a value between 1 and 100.', 'quality.html')
    .toInt()
    .min(1)
    .max(100)
    .value();
  return {
    output: [
      {
        name: 'q',
        fn: async (sharp, pipeline) => {
          const format = await getOutputType(sharp, pipeline);
          switch (format) {
            case 'jpeg':
            case 'jpg':
              return sharp.jpeg({ quality: normalizeQ(v) });
            case 'webp':
            case 'tiff':
              return sharp[format]({ quality: normalizeQ(v) });
            default:
              return sharp;
          }
        },
        params: [],
      },
    ],
  };
};
