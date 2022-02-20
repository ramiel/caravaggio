import { RawOperation } from '../utils/operationParser';
import { Context } from '..';
import sharp from 'sharp';
import imageLoader from '../utils/imageLoader';
import { getImageDensityByUrl, stringifyParams } from '../utils/misc';
import normalizer, { Operation } from '../normalizers';
import { ServerRequest } from 'microrouter';
import type { CacheControlStrategy } from '../utils/sender';

export interface PipelineResult {
  data: Buffer;
  format?: string;
  cacheStrategy?: CacheControlStrategy;
}

export type Pipeline = (opt: {
  url: string;
  rawOperations: Array<RawOperation>;
  req: ServerRequest;
}) => Promise<PipelineResult>;

/**
 * Returns the strict-est cache strategy
 */
export const strictestCacheStrategy = (
  operations: Operation[]
): CacheControlStrategy => {
  return operations.reduce<CacheControlStrategy>((acc, op) => {
    const strategy = op.cacheStrategy || 'public';
    if (acc === 'skip') return acc;
    return strategy === 'skip'
      ? strategy
      : strategy === 'private'
      ? strategy
      : acc;
  }, 'public');
};

const pipelineCreator = (context: Context): Pipeline => {
  const loader = imageLoader(context);
  const logger = context.logger;
  const { normalize } = normalizer(context);
  const {
    config: { defaultOperations = [] },
  } = context;

  return async ({ url, rawOperations, req }): Promise<PipelineResult> => {
    const buffer = await loader.get(url, req);
    const image = sharp(buffer, { density: getImageDensityByUrl(url) });
    const operations = normalize([...defaultOperations, ...rawOperations]);
    const result = await operations.reduce(
      async (acc, { name, op, params }) => {
        if (logger.isLevelEnabled('debug')) {
          logger.debug(
            `Applying operation "${name}":"${stringifyParams(params)}"`
          );
        }
        const prevStepImage = await acc;
        return op({ image: prevStepImage, otherOps: operations, req });
      },
      Promise.resolve(image)
    );

    const { data, info } = await result.toBuffer({ resolveWithObject: true });

    return {
      data,
      format: info.format,
      cacheStrategy: strictestCacheStrategy(operations),
    };
  };
};

export default pipelineCreator;
