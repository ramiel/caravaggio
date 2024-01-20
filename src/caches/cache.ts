import md5 from 'md5';
import { CacheConfig } from '../config/default';
import PersistorFactory, { CacheArtifact } from '../persistors';
import { PipelineResult } from '../pipeline';

export interface CaravaggioCache {
  has: (url: string) => Promise<boolean>;
  get: (url: string) => Promise<CacheArtifact | null>;
  set: (rl: string, result: PipelineResult) => Promise<CacheArtifact>;
}

const cache = (config: CacheConfig): CaravaggioCache => {
  const persistor = PersistorFactory.create(config);
  const getKey = (url: string) => md5(url);

  const cache: CaravaggioCache = {
    has: async (url: string) => {
      return persistor.has(getKey(url));
    },

    get: async (url: string) => persistor.read(getKey(url)),

    set: async (url: string, result: PipelineResult) => {
      return persistor.save(getKey(url), result.data);
    },
  };

  return cache;
};

export default cache;
