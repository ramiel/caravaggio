import { createClient, commandOptions } from 'redis';

import { RedisCacheOptions } from '../config/default';
import { Persistor } from '.';

const maxRetries = parseInt(process.env.REDIS_MAX_RETRIES || '') || 20;
const nameSpace = (process.env.REDIS_NAMESPACE || 'cvg') + '_';

const redisPersistor: (opt: RedisCacheOptions) => Persistor = (
  { url, limit } = { url: '', limit: 0 }
) => {
  const redisClient = createClient({
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > maxRetries) {
          console.error('Failure to connect to Redis server - exiting');
          return process.exit(1);
        }

        return Math.min(retries * 500, 10000);
      },
    },
    url,
  });

  redisClient.on('error', (err: Error) => {
    console.log('Redis Client Error', err.message);
  });

  const getKey = (filename: string) => nameSpace + filename;

  const cache: Persistor = {
    init: async () => {
      await redisClient.connect();
      if (limit) {
        await redisClient.configSet('maxmemory', `${limit}mb`);
        await redisClient.configSet('maxmemory-policy', 'allkeys-lru');
      }
      return cache;
    },

    has: async (filename) =>
      (await redisClient.exists(getKey(filename))) ? true : false,

    read: async (filename) => {
      const data = await redisClient.get(
        commandOptions({ returnBuffers: true }),
        getKey(filename)
      );

      if (data) {
        return {
          type: 'buffer',
          data,
        };
      } else {
        return null;
      }
    },

    save: async (filename, buffer) => {
      await redisClient.set(getKey(filename), buffer);
      return {
        type: 'buffer',
        data: buffer,
      };
    },

    shutdown: async () => {
      await redisClient.disconnect();
    },
  };

  return cache;
};

export default redisPersistor;
