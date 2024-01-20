import {
  FileCacheOptions,
  MemoryCacheOptions,
  NoneCacheOptions,
  RedisCacheOptions,
} from '../config/default';
import file from './file';
import memory from './memory';
import none from './none';
import redis from './redis';

export type CacheArtifactType = 'buffer';

export type CacheArtifact = {
  type: CacheArtifactType;
  data: Buffer;
};

export interface Persistor {
  init?: () => Promise<Persistor>;
  flush?: () => Promise<void>;
  has: (key: string) => Promise<boolean>;
  read: (key: string) => Promise<CacheArtifact | null>;
  save: (key: string, buf: Buffer) => Promise<CacheArtifact>;
  shutdown?: () => Promise<void>;
}

const basePersitorByType = {
  file,
  memory,
  redis,
  none,
};

type CreateOptions =
  | {
      type: 'file';
      options: FileCacheOptions;
    }
  | {
      type: 'memory';
      options: MemoryCacheOptions;
    }
  | {
      type: 'redis';
      options: RedisCacheOptions;
    }
  | {
      type: 'none';
      options: NoneCacheOptions;
    };

export default {
  create: ({ type, options = {} }: CreateOptions) => {
    switch (type) {
      case 'file':
        return basePersitorByType.file(options as FileCacheOptions);
      case 'memory':
        return basePersitorByType.memory(options as MemoryCacheOptions);
      case 'redis': {
        const redisPersistor = basePersitorByType.redis(
          options as RedisCacheOptions,
        );
        redisPersistor.init?.();
        return redisPersistor;
      }
      case 'none':
        return basePersitorByType.none(options as NoneCacheOptions);
      default:
        throw new Error(
          `Unknown persistor type ${type}. Check your configuration`,
        );
    }
  },
};
