const { buildDocumentationLink } = require('../../utils');
const cohercer = require('../../cohercer');

const COLOR_REGEX = /^([A-Fa-f0-9]{6}|(0[0-9]{2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]){3})(\.\d+)?$/;

const color = {
  /**
   * Convert hex to rgb
   * hex in format 'FFFFFF'
   */
  hexToRGB: (hex) => {
    /* eslint-disable no-bitwise, no-mixed-operators */
    const value = parseInt(hex, 16);
    const r = value >> 16;
    const g = value >> 8 & 0xFF;
    const b = value & 0xFF;

    return { r, g, b };
    /* eslint-enable no-bitwise, no-mixed-operators */
  },

  getColorFromParameter: (param, errorMessage) => {
    const value = cohercer(param, errorMessage || `Invalid color paramter "${param}".
See ${buildDocumentationLink('resize.html#colors')}
`)
      .toString()
      .match(COLOR_REGEX)
      .value();

    const dotIndex = value.indexOf('.');
    const number = value.slice(0, dotIndex > 0 ? dotIndex : undefined);
    const alpha = dotIndex > 0 ? value.slice(dotIndex) : 1;
    if (number.length === 6) {
      return { ...color.hexToRGB(number), alpha: parseFloat(alpha, 10) };
    }
    return {
      r: parseInt(number.slice(0, 3), 10),
      g: parseInt(number.slice(3, 6), 10),
      b: parseInt(number.slice(6), 10),
      alpha: parseFloat(alpha, 10),
    };
  },
};

module.exports = color;
