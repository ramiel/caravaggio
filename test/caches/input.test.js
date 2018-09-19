const { URL } = require('url');
const Cache = require('caches/input');
const config = require('../mocks/config.mock');

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
  beforeEach(() => {
    config.mockClear();
  });

  test('the cache configuration is correctly looked up in the config', () => {
    Cache(config);
    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith('caches.input');
  });

  test('given the same url, return the same filename', () => {
    const url = new URL('http://www.image.com/img.png');
    const cache = Cache(config);
    expect(cache.getFileName(url)).toBe(cache.getFileName(url));
  });

  test('can retrieve a value from the cache', async () => {
    const url = new URL('http://www.image.com/img.png');
    const cache = Cache(config);
    const saved = await cache.get(url);
    expect(saved).toEqual(expect.objectContaining({
      type: 'buffer',
      buffer: expect.any(Buffer),
      name: expect.any(String),
    }));
  });

  test('can save a value in the cache', async () => {
    const url = new URL('http://www.image.com/img.png');
    const cache = Cache(config);
    const saved = await cache.set(url, Buffer.from('test'));
    expect(saved).toEqual(expect.objectContaining({
      type: 'buffer',
      buffer: expect.any(Buffer),
      name: expect.any(String),
    }));
  });
});

