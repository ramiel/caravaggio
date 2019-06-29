const cohercer = require('../../cohercer');
const scale = require('./scale');
const fit = require('./fit');
const downfit = require('./downfit');
const upfit = require('./upfit');
const fill = require('./fill');
const downfill = require('./downfill');
const embed = require('./embed');

const MODES = {
  scale,
  fit,
  downfit,
  upfit,
  fill,
  downfill,
  embed,
};

const AVAILABLE_MODES = Object.keys(MODES);

const RESIZE_PATTERN = /^(\d+(.\d+)?x\d+(.\d+)?|\d+(.\d+)?x?|x\d+(.\d+)?)$/;

const percentageToPixel = async ({ width, height }, sharp) => {
  const metadata = await sharp.metadata();
  const w = width && (width < 1 ? Math.round(width * metadata.width) : width);
  const h = height && (height < 1 ? Math.round(height * metadata.height) : height);
  return { width: w, height: h };
};

const getWidthAndHeight = async (sizes, sharp) => {
  let width = null;
  let height = null;
  if (sizes.indexOf(':') !== -1) {
    throw new Error('Aspect ratio not implemented yet');
  } else {
    const values = sizes.split('x');
    width = parseFloat(values[0], 10) || null;
    height = parseFloat(values[1], 10) || null;
    const isPercentage = (width && width < 1) || (height && height < 1);
    if (isPercentage) {
      ({ width, height } = await percentageToPixel({ width, height }, sharp));
    } else {
      width = width && Math.round(width);
      height = height && Math.round(height);
    }
  }
  return [width, height];
};

/**
 *
 * @param {String} value Value in the format
 */
module.exports = (size, mode = 'scale', ...modeParams) => {
  /* eslint-disable no-param-reassign */
  size = cohercer(size, 'Resize: the size parameter is in the wrong format.', 'resize.html#sizes')
    .toString()
    .match(RESIZE_PATTERN)
    .value();

  mode = cohercer(mode, `Resize, the mode ${mode} is not valid.`, 'resize.html')
    .toString()
    .enum(AVAILABLE_MODES)
    .value();
  /* eslint-enable no-param-reassign */

  return {
    transformations: [
      {
        name: 'resize',
        fn: async (sharp, pipeline) => {
          const [width, height] = await getWidthAndHeight(size, sharp);
          return MODES[mode](sharp, pipeline)(width, height, ...modeParams);
        },
        params: [mode, size],
      },
    ],
  };
};

