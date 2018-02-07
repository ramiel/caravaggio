const config = require('config');
const { parseOptions } = require('../src/parser')(config);

describe('Parser', () => {
  describe('option parser', () => {
    test('parse "rotate"', () => {
      const parsedOtpions = parseOptions('rotate_90');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        transformations: [
          {
            name: 'rotate',
            operation: 'rotate',
            params: [90],
          },
        ],
      }));
    });

    test('parse "o"', () => {
      const parsedOtpions = parseOptions('o_jpg');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        o: 'jpg',
        output: [
          {
            name: 'o',
            operation: 'jpeg',
            params: [],
          },
        ],
      }));
    });

    test('parse "o" and "rotate"', () => {
      const parsedOtpions = parseOptions('o_jpg,rotate_90');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        o: 'jpg',
        transformations: [
          {
            name: 'rotate',
            operation: 'rotate',
            params: [90],
          },
        ],
        output: [
          {
            name: 'o',
            operation: 'jpeg',
            params: [],
          },
        ],
      }));
    });

    test('ignore unknown operations', () => {
      const parsedOtpions = parseOptions('unknown_50');
      expect(parsedOtpions).toEqual(expect.objectContaining({
        transformations: [],
      }));
    });
  });
});
