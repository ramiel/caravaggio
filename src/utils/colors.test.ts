import { getColorFromParameter } from './colors';

describe('Colors', () => {
  describe('getColorFromParameter', () => {
    test('RGB colors are accepted', () => {
      const color = getColorFromParameter('000000255');
      expect(color).toEqual({
        r: 0,
        g: 0,
        b: 255,
        alpha: 1,
      });
    });

    test('RGB colors with leading zeros are accepted', () => {
      const color = getColorFromParameter('002024050');
      expect(color).toEqual({
        r: 2,
        g: 24,
        b: 50,
        alpha: 1,
      });
    });

    test('RGB colors with alpha are accepted', () => {
      const color = getColorFromParameter('012234255.8');
      expect(color).toEqual({
        r: 12,
        g: 234,
        b: 255,
        alpha: 0.8,
      });
    });

    test('HEX colors are accepted', () => {
      const color = getColorFromParameter('FFAABB');
      expect(color).toEqual({
        r: 255,
        g: 170,
        b: 187,
        alpha: 1,
      });
    });

    test('HEX colors with alpha are accepted', () => {
      const color = getColorFromParameter('FFAABB.7');
      expect(color).toEqual({
        r: 255,
        g: 170,
        b: 187,
        alpha: 0.7,
      });
    });
  });
});
