const { parseOptions } = require('../src/parser');

describe('Parser', () => {
  describe('option parser', () => {
    test('parser "rotate"', () => {
      const parsedOtpions = parseOptions('rotate_90');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        operations: [
          ['rotate', [90]],
        ],
      }));
    });
  });
});
