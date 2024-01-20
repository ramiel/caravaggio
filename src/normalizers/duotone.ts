import { Normalizer } from '.';
import cohercer from '../utils/cohercer';
import { RawOperation } from '../utils/operationParser';
import { getColorFromParameter, Color } from '../utils/colors';
import sharp, { Raw, Sharp } from 'sharp';
import { getOutputType } from '../utils/misc';

interface DuotoneRawOp extends RawOperation {
  h: string; //highlight
  s: string; // shadow
  o?: string; // opacity
}

// Implementation from gatsby-plugin-sharp
// @see https://github.com/gatsbyjs/gatsby/blob/bb0bb9c/packages/gatsby-plugin-sharp/src/duotone.js

const errorMessage = 'Invalid color parameter';
const docUri = 'duotone.html';

const createGradient = (primaryColorRGB: Color, secondaryColorRGB: Color) => {
  const gradient = [];

  for (let i = 0; i < 256; i++) {
    const ratio = i / 255;
    gradient.push([
      Math.round(primaryColorRGB.r * ratio + secondaryColorRGB.r * (1 - ratio)),
      Math.round(primaryColorRGB.g * ratio + secondaryColorRGB.g * (1 - ratio)),
      Math.round(primaryColorRGB.b * ratio + secondaryColorRGB.b * (1 - ratio)),
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
const overlayAlphaImage = async (
  duotoneImage: Sharp,
  originalImage: Sharp,
  opacity: number,
  format?: string
) => {
  const metadata = await duotoneImage.flatten().metadata();
  const width = metadata.width as number;
  const height = metadata.height as number;
  const percentGrey = Math.round(opacity * 255);
  const percentTransparency = Buffer.alloc(width * height, percentGrey);

  const duotoneWithTransparency = await duotoneImage
    .joinChannel(percentTransparency, {
      raw: { width, height, channels: 1 },
    })
    .raw()
    .toBuffer();

  return originalImage
    .composite([
      {
        input: duotoneWithTransparency,
        raw: { width, height, channels: 4 },
      },
    ])
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info: raw }) =>
      sharp(data, { raw: raw as Raw }).toFormat(
        format as keyof sharp.FormatEnum
      )
    );
};

const duotone: Normalizer<DuotoneRawOp> = ({
  h: highlightColor,
  s: shadowColor,
  o: opacity,
}) => {
  const gradient = createGradient(
    getColorFromParameter(highlightColor, errorMessage, docUri),
    getColorFromParameter(shadowColor, errorMessage, docUri)
  );
  let opacityValue: number | null = null;
  if (opacity) {
    opacityValue = cohercer(opacity, 'Opacity is not valid', docUri)
      .toFloat()
      .value();
  }

  const params: [string, string, number?] = [highlightColor, shadowColor];
  if (opacityValue) {
    params.push(opacityValue);
  }

  return [
    {
      name: 'duotone',
      params,
      op: async ({ image, otherOps }) => {
        const format = await getOutputType(image, otherOps);

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
        const newImage = sharp(data, { raw: info as Raw });

        if (opacityValue && opacityValue > 0 && opacityValue < 1) {
          return overlayAlphaImage(
            newImage.clone(),
            image.clone(),
            opacityValue,
            format
          );
        }
        return format ? newImage.toFormat(format) : newImage;
      },
    },
  ];
};

export default duotone;
