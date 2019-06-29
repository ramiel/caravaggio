const { getGravityFromParameter } = require('./gravity');

module.exports = sharp => async (width, height, gravity) => {
  const gravityValue = getGravityFromParameter(gravity, { acceptAuto: true });
  return sharp.resize(
    width,
    height,
    { position: gravityValue, withoutEnlargement: true },
  );
};

