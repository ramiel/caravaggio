import { RedisMemoryServer } from 'redis-memory-server';

import redisPersistor from './redis';
import { Persistor } from '.';

describe('Redis persistor', () => {
  const redisServer = new RedisMemoryServer();
  let cache: Persistor;

  beforeAll(async () => {
    const host = await redisServer.getHost();
    const port = await redisServer.getPort();

    cache = (await redisPersistor({
      url: `redis://${host}:${port}`,
    }).init?.()) as Persistor;
  });

  afterAll(async () => {
    await cache.shutdown?.();
    await redisServer.stop();
  });

  test('saves a buffer', async () => {
    const buf = Buffer.alloc(1024);
    const result = await cache.save('afile.png', buf);
    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('data', buf);
  });

  test('returns null if a file is not saved', async () => {
    const result = await cache.read(Date.now() + '.png');
    expect(result).toBe(null);
  });

  test('tells if an element exists', async () => {
    const buf = Buffer.alloc(1024);
    const filename = 'afile.png';
    await cache.save(filename, buf);
    const result = await cache.has(filename);
    expect(result).toBe(true);
  });

  test('returns a previously saved file', async () => {
    const buf = Buffer.alloc(1024);
    await cache.save('afile.png', buf);
    const result = await cache.read('afile.png');

    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('data', buf);
  });
});
