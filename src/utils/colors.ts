import cohercer from './cohercer';
const COLOR_REGEX =
  /^([A-Fa-f0-9]{6}|(0[0-9]{2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]){3})(\.\d+)?$/;

export interface Color {
  r: number;
  g: number;
  b: number;
  alpha: number;
}
/**
 * Convert hex to rgb
 * hex in format 'FFFFFF'
 */
export const hexToRGB = (hex: string) => {
  const value = parseInt(hex, 16);
  const r = value >> 16;
  const g = (value >> 8) & 0xff;
  const b = value & 0xff;

  return { r, g, b };
};

export const getColorFromParameter = (
  param: string,
  errorMessage = `Invalid color paramter "${param}".`,
  docUri = 'resize.html#colors'
): Color => {
  const value = cohercer(param, errorMessage, docUri)
    .toString()
    .match(COLOR_REGEX)
    .value();

  const dotIndex = value.indexOf('.');
  const number = value.slice(0, dotIndex > 0 ? dotIndex : undefined);
  const alpha = dotIndex > 0 ? value.slice(dotIndex) : '1';
  if (number.length === 6) {
    return { ...hexToRGB(number), alpha: parseFloat(alpha) };
  }
  return {
    r: parseInt(number.slice(0, 3), 10),
    g: parseInt(number.slice(3, 6), 10),
    b: parseInt(number.slice(6), 10),
    alpha: parseFloat(alpha),
  };
};
