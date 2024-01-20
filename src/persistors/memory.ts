import { Persistor } from '.';
import { MemoryCacheOptions } from '../config/default';

const BToMB = (B: number) => Math.round((B / 1024 / 1024) * 100) / 100;

const memoryPersistor: (opt: MemoryCacheOptions) => Persistor = (
  { limit } = { limit: 100 },
) => {
  const fileCache = new Map();
  let size = 0;

  const checkMemory = (filename: string) => {
    if (limit && limit > 0 && size > limit) {
      const next = fileCache.keys().next();
      if (!next.done) {
        const first = next.value;
        if (first !== filename) {
          fileCache.delete(first);
        }
      }
    }
  };

  const increaseSize = (length: number) => {
    size += BToMB(length);
  };

  const cache: Persistor = {
    flush: async () => {
      fileCache.clear();
      size = 0;
    },

    has: async (filename) => fileCache.has(filename),

    read: async (filename) =>
      fileCache.has(filename)
        ? {
            type: 'buffer',
            data: fileCache.get(filename),
          }
        : null,

    save: async (filename, buffer) => {
      fileCache.set(filename, buffer);
      increaseSize(buffer.length);
      checkMemory(filename);
      return {
        type: 'buffer',
        data: buffer,
      };
    },
  };

  return cache;
};

export default memoryPersistor;
