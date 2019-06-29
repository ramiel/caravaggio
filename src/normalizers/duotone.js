
const sharp = require('sharp');
const { getColorFromParameter } = require('./resize/color');

// Implementation from gatsby-plugin-sharp
// @see https://github.com/gatsbyjs/gatsby/pull/1047/files#diff-715781debb0c539e5428ea8e41703852

function createDuotoneGradient(primaryColorRGB, secondaryColorRGB) {
  const duotoneGradient = [];

  for (let i = 0; i < 256; i++) {
    const ratio = i / 255;
    duotoneGradient.push([
      Math.round(
        primaryColorRGB.r * ratio + secondaryColorRGB.r * (1 - ratio),
      ),
      Math.round(
        primaryColorRGB.g * ratio + secondaryColorRGB.g * (1 - ratio),
      ),
      Math.round(
        primaryColorRGB.b * ratio + secondaryColorRGB.b * (1 - ratio),
      ),
    ]);
  }
  return duotoneGradient;
}

module.exports = (colorA, colorB) => {
  const duotoneGradient = createDuotoneGradient(
    getColorFromParameter(colorA),
    getColorFromParameter(colorB),
  );

  return {
    transformations: [
      {
        name: 'duotone',
        params: [colorA, colorB],
        fn: async (engine) => {
          const { data, info } = await engine
            .raw()
            .toBuffer({ resolveWithObject: true });
          for (let i = 0; i < data.length; i += info.channels) {
            const r = data[i + 0];
            const g = data[i + 1];
            const b = data[i + 2];

            // @see https://en.wikipedia.org/wiki/Relative_luminance
            const avg = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
            [data[i + 0], data[i + 1], data[i + 2]] = duotoneGradient[avg];
          }
          const newEngine = sharp(data, { raw: info });
          return newEngine;
        },
      },
    ],
  };
};
