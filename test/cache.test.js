const path = require('path');
const { URL } = require('url');
const Cache = require('../src/cache');

const dummyPersistor = {
  exists: Promise.resolve(true),
  read: Promise.resolve({
    type: 'buffer',
    buffer: Buffer.from('test'),
  }),
};

describe('Cache', () => {
  test('given the same url and options, return the same filename', () => {
    const url = new URL('http://www.image.com/img.png');
    const options = {
      o: 'webp',
      rawNormalizedOptions: 'o_webp,w_200',
    };
    const cache = Cache(dummyPersistor);
    expect(cache.getFileName(url, options)).toBe(cache.getFileName(url, options));
  });

  test('if the o options is "png" the resulting filename has  ".png" ext', () => {
    const url = new URL('http://www.image.com/img.png');
    const options = {
      o: 'png',
      rawNormalizedOptions: 'o_png,w_200',
    };
    const cache = Cache(dummyPersistor);
    expect(path.extname(cache.getFileName(url, options))).toBe('.png');
  });

  test('if the o options is "original" the resulting filename has the same extension as the input', () => {
    const url = new URL('http://www.image.com/img.tiff');
    const options = {
      o: 'original',
      rawNormalizedOptions: 'w_200',
    };
    const cache = Cache(dummyPersistor);
    expect(path.extname(cache.getFileName(url, options))).toBe('.tiff');
  });
});

