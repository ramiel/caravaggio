const { parseOptions } = require('../src/parser');

describe('Parser', () => {
  describe('option parser', () => {
    test('parse "rotate"', () => {
      const parsedOtpions = parseOptions('rotate_90');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        operations: [
          ['rotate', [90]],
        ],
      }));
    });

    test('parse "o"', () => {
      const parsedOtpions = parseOptions('o_jpg');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        o: 'jpg',
        operations: [
          ['jpeg', []],
        ],
      }));
    });

    test('parse "o" and "rotate"', () => {
      const parsedOtpions = parseOptions('o_jpg,rotate_90');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        o: 'jpg',
        operations: [
          ['jpeg', []],
          ['rotate', [90]],
        ],
      }));
    });

    test('ignore unknown operations', () => {
      const parsedOtpions = parseOptions('unknown_50');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        operations: [],
      }));

      expect(parsedOtpions).not.toEqual(expect.objectContaining({
        operations: [
          ['unknown', [50]],
        ],
      }));
    });
  });
});
