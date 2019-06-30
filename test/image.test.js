const fetch = require('node-fetch'); // this is a mock
const Image = require('image');
const Sharp = require('sharp');
const nonePersistor = require('persistors/none');
const config = require('config');

jest.mock('../src/logger');
jest.mock('persistors/none', () => {
  const persistor = {
    read: jest.fn(() => Promise.resolve(null)),
    save: jest.fn((filename, buffer) => Promise.resolve({
      type: 'buffer',
      buffer,
    })),
  };
  return () => persistor;
});

describe('Image', () => {
  const persistor = nonePersistor();

  beforeEach(() => {
    fetch.mockClear();
    persistor.read.mockClear();
    persistor.save.mockClear();
  });

  test('get an image handler', () => {
    const image = Image(config);
    expect(image).toBeInstanceOf(Object);
    expect(image).toHaveProperty('get', expect.any(Function));
    expect(image).toHaveProperty('getImageHandler', expect.any(Function));
  });

  test('it retrieves the image from the netowrk', async () => {
    const image = Image(config);
    await image.get('http://anurl');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('it return the image as a sharp object', async () => {
    const image = Image(config);
    const sharpImage = await image.getImageHandler('http://anurl');
    expect(sharpImage).toBeInstanceOf(Sharp);
  });

  describe('Input cache', () => {
    let image;

    beforeAll(() => {
      config.caches.input = {
        type: 'none',
        options: {},
      };
      image = Image(config);
    });

    test('check the cache before', async () => {
      await image.getImageHandler('http://anurl');
      expect(persistor.read).toHaveBeenCalledTimes(1);
    });

    test('if the cache hit, the image is not downloaded again', async () => {
      persistor.read.mockImplementationOnce(() => Promise.resolve(Buffer.from('')));
      await image.get('http://anurl');
      expect(persistor.read).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledTimes(0);
    });
  });
});

