import { AugmentedRequestHandler } from 'microrouter';
import { Context } from '..';
import cacheFactory from '../caches/cache';
import { CacheConfig } from '../config/default';
import CError from '../errors/CError';
import pipelineCreator from '../pipeline';
import operationParser from '../utils/operationParser';
import senderCreator from '../utils/sender';

const defaultOutputCacheConfig: CacheConfig = {
  type: 'memory',
  options: {
    limit: 100,
  },
};

const indexRoute = (context: Context): AugmentedRequestHandler => {
  const { logger, config } = context;
  const cache = cacheFactory(config.caches?.output || defaultOutputCacheConfig);
  const sender = senderCreator(config);
  const pipeline = pipelineCreator(context);
  const basePathRegexp = new RegExp(`^${config.basePath}`);
  const basePathReplacer = (url: string) =>
    config.basePath ? url.replace(basePathRegexp, '') : url;

  const handler: AugmentedRequestHandler = async (req, res) => {
    const url = basePathReplacer(req.url || '/');
    const cachedResource = await cache.get(url);
    if (cachedResource) {
      logger.info(`Cache hit for resource "${url}"`);
      return sender.sendImage(cachedResource, req, res);
    }
    const [path] = url.split('?');
    const rawOperations = operationParser(path);
    const imageUrl = req.query.image;
    const referer = req.headers.host;
    if (!imageUrl) {
      throw new CError('You must provide an image url', '', 500);
    }

    logger.debug(imageUrl, 'Image URL');
    logger.debug(referer || 'No referer available', 'Referer');
    logger.debug(rawOperations, 'Raw operations');

    const result = await pipeline({ url: imageUrl, rawOperations, req });
    await sender.sendImage(result, req, res, result.cacheStrategy);
    if (result.cacheStrategy === 'public') {
      await cache.set(url, result);
    }
  };

  return handler;
};

export default indexRoute;
