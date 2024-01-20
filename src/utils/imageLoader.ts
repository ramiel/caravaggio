import { ServerRequest } from 'microrouter';
import { Context } from '..';
import cache from '../caches/cache';
import { CacheConfig } from '../config/default';

const defaultInputCache: CacheConfig = {
  type: 'none',
  options: null,
};

interface ImageLoader {
  /**
   * Given an url, returns the loaded image or raises an error
   * @throws Error if cannot load the image
   */
  get: (url: string, req: ServerRequest) => Promise<Buffer>;
}

const imageLoader = (context: Context): ImageLoader => {
  const { logger } = context;
  const inputCache = cache(context.config.caches?.input || defaultInputCache);
  return {
    get: async (url, req) => {
      const cached = await inputCache.get(url);
      if (cached) {
        logger.debug(
          `Input cache hit for url "${url}". Do not re-download it.`,
        );
        return cached.data;
      }
      const finalUrl = await context.pluginManager.urlTransform(url, req);
      const loaded = (await context.pluginManager.inputImageLoader(
        finalUrl,
      )) as Buffer | null;
      if (loaded === null) {
        throw new Error(`Cannot load image "${url}"`);
      }
      inputCache.set(url, {
        data: loaded,
      });
      return loaded;
    },
  };
};

export default imageLoader;
