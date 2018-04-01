const config = require('config');
const path = require('path');
const { URL } = require('url');
const Cache = require('caches/output');

jest.mock('persistors', () => {
  const dummyPersistor = {
    exists: Promise.resolve(true),
    read: () => Promise.resolve({
      type: 'buffer',
      buffer: Buffer.from('test'),
    }),
    save: (filename, buffer) => Promise.resolve({
      type: 'buffer',
      buffer,
    }),
  };
  return {
    create: () => dummyPersistor,
  };
});

describe('Cache', () => {
  test('given the same url and options, return the same filename', () => {
    const url = new URL('http://www.image.com/img.png');
    const options = {
      o: 'webp',
      rawNormalizedOptions: 'o_webp,w_200',
    };
    const cache = Cache(config);
    expect(cache.getFileName(url, options)).toBe(cache.getFileName(url, options));
  });

  test('can get a value in the cache', async () => {
    const url = new URL('http://www.image.com/img.png');
    const options = {
      o: 'webp',
      rawNormalizedOptions: 'o_webp,w_200',
    };
    const cache = Cache(config);
    const saved = await cache.get(url, options);
    expect(saved).toEqual(expect.objectContaining({
      type: 'buffer',
      buffer: expect.any(Buffer),
      name: expect.any(String),
    }));
  });

  test('can save a value in the cache', async () => {
    const url = new URL('http://www.image.com/img.png');
    const options = {
      o: 'webp',
      rawNormalizedOptions: 'o_webp,w_200',
    };
    const cache = Cache(config);
    const saved = await cache.set(url, options, Buffer.from('test'));
    expect(saved).toEqual(expect.objectContaining({
      type: 'buffer',
      buffer: expect.any(Buffer),
      name: expect.any(String),
    }));
  });

  test('if the o options is "png" the resulting filename has  ".png" ext', () => {
    const url = new URL('http://www.image.com/img.png');
    const options = {
      o: 'png',
      rawNormalizedOptions: 'o_png,w_200',
    };
    const cache = Cache(config);
    expect(path.extname(cache.getFileName(url, options))).toBe('.png');
  });

  test('if the o options is "original" the resulting filename has the same extension as the input', () => {
    const url = new URL('http://www.image.com/img.tiff');
    const options = {
      o: 'original',
      rawNormalizedOptions: 'w_200',
    };
    const cache = Cache(config);
    expect(path.extname(cache.getFileName(url, options))).toBe('.tiff');
  });
});

