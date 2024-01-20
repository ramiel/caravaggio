import { Sharp } from 'sharp';

export const sizePercentageToPixel = async (
  opt: { width: number | null; height: number | null },
  image: Sharp,
) => {
  const { width, height } = opt;
  const metadata = await image.metadata();
  const w =
    width &&
    (width < 1 ? Math.round(width * (metadata.width as number)) : width);
  const h =
    height &&
    (height < 1 ? Math.round(height * (metadata.height as number)) : height);
  return { width: w, height: h };
};

/**
 * Given a string representing a size, returns it in numeric values
 * @param size A string repesenting a size. e.g 120x130  0.5x0.9  120x  x130
 * @param image The image to get the size
 */
export const sizeToPixel = async (size: string, image: Sharp) => {
  let width = null;
  let height = null;
  if (size.indexOf(':') !== -1) {
    throw new Error('Aspect ratio not implemented yet');
  }
  const values = size.split('x');
  width = parseFloat(values[0]) || null;
  height = parseFloat(values[1]) || null;
  const isPercentage = (width && width < 1) || (height && height < 1);
  if (isPercentage) {
    ({ width, height } = await sizePercentageToPixel({ width, height }, image));
  } else {
    width = width && Math.round(width);
    height = height && Math.round(height);
  }
  return [width, height];
};
