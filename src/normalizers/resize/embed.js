const { getGravityFromParameter } = require('./gravity');
const { getColorFromParameter } = require('./color');

module.exports = sharp => async (width, height, ...params) => {
  let color = {
    r: 0, g: 0, b: 0, alpha: 1,
  };
  let gravity;
  if (params) {
    const rawColor = params.find(p => p.indexOf('b') === 0);
    const rawGravity = params.find(p => p.indexOf('g') === 0);
    color = (rawColor && getColorFromParameter(rawColor.slice(1))) || color;
    gravity = rawGravity && getGravityFromParameter(rawGravity.slice(1));
  }

  return sharp.resize(width, height, { fit: 'contain', position: gravity, background: color });
};

