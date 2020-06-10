/* eslint-env jest */
import cacheFactory from './cache';
import { Persistor } from '../persistors/index';
import { CacheConfig } from '../config/default';

jest.mock('../persistors', () => {
  const dummyPersistor: Persistor = {
    has: () => Promise.resolve(true),
    read: async () => ({
      data: Buffer.from('test'),
      type: 'buffer',
    }),
    save: async (key, buffer) => ({
      type: 'buffer',
      data: buffer,
    }),
  };
  return {
    create: () => dummyPersistor,
  };
});

describe('Cache', () => {
  const config: CacheConfig = { type: 'none', options: null };
  const url = 'anurl';

  test('can get a value in the cache', async () => {
    const cache = cacheFactory(config);
    const saved = await cache.get(url);
    expect(saved).toEqual(
      expect.objectContaining({
        type: 'buffer',
        data: expect.any(Buffer),
      })
    );
  });

  test('can save a value in the cache', async () => {
    const cache = cacheFactory(config);
    const saved = await cache.set(url, { data: Buffer.from('test') });
    expect(saved).toEqual(
      expect.objectContaining({
        type: 'buffer',
        data: expect.any(Buffer),
      })
    );
  });
});
