
const sharp = require('sharp');
const { getColorFromParameter } = require('./resize/color');
const { getOutputType } = require('./utils');
const cohercer = require('../cohercer');

// Implementation from gatsby-plugin-sharp
// @see https://github.com/gatsbyjs/gatsby/blob/bb0bb9c/packages/gatsby-plugin-sharp/src/duotone.js

const errorMessage = 'Invalid color parameter';
const docUri = 'duotone.html';

const createGradient = (primaryColorRGB, secondaryColorRGB) => {
  const gradient = [];

  for (let i = 0; i < 256; i++) {
    const ratio = i / 255;
    gradient.push([
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
  return gradient;
};

/**
 * Create a semirtansparent, mono-channel version of the duotone imag and apply as alpha channel
 * to the original image
 * @param {Sharp} duotoneImage Duotone image
 * @param {Sharp} originalImage Original image that produced the duotone image
 * @param {Number} opacity A valu between > 0 and < 1
 * @param {String} format The resulting format
 */
const overlayAlphaImage = async (duotoneImage, originalImage, opacity, format) => {
  const { width, height } = await duotoneImage
    .flatten()
    .metadata();
  const percentGrey = Math.round(opacity * 255);
  const percentTransparency = Buffer.alloc(width * height, percentGrey);

  const duotoneWithTransparency = await duotoneImage
    .joinChannel(percentTransparency, {
      raw: { width, height, channels: 1 },
    })
    .raw()
    .toBuffer();

  return originalImage
    .overlayWith(duotoneWithTransparency, {
      raw: { width, height, channels: 4 },
    })
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info: raw }) => sharp(data, { raw }).toFormat(format));
};

module.exports = (highlightColor, shadowColor, opacity) => {
  const gradient = createGradient(
    getColorFromParameter(highlightColor, errorMessage, docUri),
    getColorFromParameter(shadowColor, errorMessage, docUri),
  );
  let opacityValue;
  if (opacity) {
    opacityValue = cohercer(opacity, 'Opacity is not valid', docUri)
      .toFloat()
      .value();
  }

  const params = [highlightColor, shadowColor];
  if (opacityValue) {
    params.push(opacityValue);
  }

  return {
    transformations: [
      {
        name: 'duotone',
        params,
        fn: async (image, pipeline) => {
          const format = await getOutputType(image, pipeline);

          const { data, info } = await image
            .clone()
            .raw()
            .toBuffer({ resolveWithObject: true });
          for (let i = 0; i < data.length; i += info.channels) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // @see https://en.wikipedia.org/wiki/Relative_luminance
            const avg = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
            [data[i], data[i + 1], data[i + 2]] = gradient[avg];
          }
          const newImage = sharp(data, { raw: info });

          if (opacityValue && opacity > 0 && opacityValue < 1) {
            return overlayAlphaImage(
              newImage.clone(),
              image.clone(),
              opacity,
              format,
            );
          }
          return newImage.toFormat(format);
        },
      },
    ],
  };
};
