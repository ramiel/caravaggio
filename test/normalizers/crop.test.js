const sharp = require('sharp');
const crop = require('../../src/normalizers/crop');

describe('Crop', () => {
  describe('with gravity', () => {
    test('crop the image with dimension and gravity', () => {
      const result = crop('200x200xeast');
      expect(result).toEqual(expect.objectContaining({
        transformations: [
          {
            name: 'crop',
            operation: 'resize',
            params: [200, 200],
          },
          {
            name: 'crop',
            operation: 'crop',
            params: [sharp.gravity.east],
          },
        ],
      }));
    });

    test('crop the image with dimension and centre gravity', () => {
      const result = crop('640x480xcentre');
      expect(result).toEqual(expect.objectContaining({
        transformations: [
          {
            name: 'crop',
            operation: 'resize',
            params: [640, 480],
          },
          {
            name: 'crop',
            operation: 'crop',
            params: [sharp.gravity.centre],
          },
        ],
      }));
    });

    test('crop the image with dimension and gravity to "attention"', () => {
      const result = crop('640x480xattention');
      expect(result).toEqual(expect.objectContaining({
        transformations: [
          {
            name: 'crop',
            operation: 'resize',
            params: [640, 480],
          },
          {
            name: 'crop',
            operation: 'crop',
            params: [sharp.strategy.attention],
          },
        ],
      }));
    });
  });

  describe('with coordinates', () => {
    test('crop the image with x, y and dimensions', () => {
      const result = crop('50x60x200x300');
      expect(result).toEqual(expect.objectContaining({
        transformations: [
          {
            name: 'crop',
            operation: 'extract',
            params: [{
              left: 50, top: 60, width: 200, height: 300,
            }],
          },
        ],
      }));
    });
  });
});

