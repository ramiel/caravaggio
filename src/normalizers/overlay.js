const cohercer = require('../cohercer');
const Image = require('../image');
const { getGravityFromParameter } = require('./resize/gravity');
const { isPercentage, percentageToPixel } = require('../utils');


/**
 *
 * @param  {...any} params
 */
module.exports = (config) => {
  const image = Image(config);

  return (overlayUrl, ...params) => {
    const xPos = params.find(p => p.indexOf('x') === 0);
    const yPos = params.find(p => p.indexOf('y') === 0);
    const gravity = getGravityFromParameter(params.find(p => p.indexOf('g') === 0));
    const watermark = params.indexOf('watermark') !== -1;

    const url = cohercer(overlayUrl && decodeURIComponent(overlayUrl), 'Overlay, url is mandatory', 'overlay.html')
      .toString()
      .value();

    const left = xPos && cohercer(xPos.slice(1), 'Extract: the x parameter in in the wrong format.', 'overlay.html')
      .toNumber()
      .value();

    const top = yPos && cohercer(yPos.slice(1), 'Extract: the x parameter in in the wrong format.', 'overlay.html')
      .toNumber()
      .value();


    return {
      transformations: [
        {
          name: 'overlay',
          params: [overlayUrl, ...params],
          fn: async (sharp) => {
            let overlay;
            try {
              overlay = await image.get(url);
            } catch (e) {
              throw new Error(`An error occurred while getting overlay image. ${e.message}`);
            }
            const { width: iw, height: ih } = await sharp.metadata();

            const options = {
              gravity,
              tile: !!watermark,
            };
            if (left !== undefined) {
              options.left = isPercentage(left) ? percentageToPixel(left, iw) : left;
            }
            if (top !== undefined) {
              options.top = isPercentage(top) ? percentageToPixel(top, ih) : top;
            }
            if (options.top !== undefined && !options.left) {
              options.left = 0;
            }
            if (!options.top && options.left !== undefined) {
              options.top = 0;
            }
            return sharp.composite([{ input: overlay, ...options }]);
          },
        },
      ],
    };
  };
};
