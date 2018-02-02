const { parseOptions } = require('../src/parser');

describe('Parser', () => {
  describe('option parser', () => {
    test('parse "rotate"', () => {
      const parsedOtpions = parseOptions('rotate_90');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        transformations: [
          ['rotate', [90]],
        ],
      }));
    });

    test('parse "o"', () => {
      const parsedOtpions = parseOptions('o_jpg');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        o: 'jpg',
        output: [
          ['jpeg', []],
        ],
      }));
    });

    test('parse "o" and "rotate"', () => {
      const parsedOtpions = parseOptions('o_jpg,rotate_90');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        o: 'jpg',
        transformations: [
          ['rotate', [90]],
        ],
        output: [
          ['jpeg', []],
        ],
      }));
    });

    test('ignore unknown operations', () => {
      const parsedOtpions = parseOptions('unknown_50');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        transformations: [],
      }));

      expect(parsedOtpions).not.toEqual(expect.objectContaining({
        transformations: [
          ['unknown', [50]],
        ],
      }));
    });
  });
});
