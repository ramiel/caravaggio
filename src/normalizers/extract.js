const cohercer = require('../cohercer');
const { isPercentage, percentageToPixel } = require('../utils');

module.exports = (x, y, w, h) => {
  const left = cohercer(x, 'Extract: the x parameter in in the wrong format.', 'extract.html')
    .toNumber()
    .value();

  const top = cohercer(y, 'Extract: the y parameter in in the wrong format.', 'extract.html')
    .toNumber()
    .value();

  const width = cohercer(w, 'Extract: the width parameter in in the wrong format.', 'extract.html')
    .toNumber()
    .value();

  const height = cohercer(h, 'Extract: the width parameter in in the wrong format.', 'extract.html')
    .toNumber()
    .value();

  return {
    transformations: [
      {
        name: 'extract',
        operation: async (pipeline) => {
          const { width: iw, height: ih } = await pipeline.getMetadata();
          return [
            {
              name: 'extract',
              operation: 'extract',
              params: [{
                left: isPercentage(left) ? percentageToPixel(left, iw) : left,
                top: isPercentage(top) ? percentageToPixel(top, ih) : top,
                width: isPercentage(width) ? percentageToPixel(width, iw) : width,
                height: isPercentage(height) ? percentageToPixel(height, ih) : height,
              }],
            },
          ];
        },
      },
    ],
  };
};

