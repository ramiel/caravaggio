import { RawOperation } from '../utils/operationParser';
import { Context } from '..';
import sharp from 'sharp';
import imageLoader from '../utils/imageLoader';
import { stringifyParams } from '../utils/misc';
import normalizer, { Operation } from '../normalizers';
import { ServerRequest } from 'microrouter';

export interface PipelineResult {
  data: Buffer;
  format?: string;
  skipCache?: boolean;
}

export type Pipeline = (opt: {
  url: string;
  rawOperations: Array<RawOperation>;
  req: ServerRequest;
}) => Promise<PipelineResult>;

/**
 * Returns true if the operations provide a non-cachable result
 */
const shouldSkipChache = (operations: Operation[]) =>
  operations.findIndex((o) => o.skipCache) !== -1;

const pipelineCreator = (context: Context): Pipeline => {
  const loader = imageLoader(context);
  const logger = context.logger;
  const { normalize } = normalizer(context);
  const {
    config: { defaultOperations = [] },
  } = context;

  return async ({ url, rawOperations, req }) => {
    const buffer = await loader.get(url);
    const image = sharp(buffer);
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
      skipCache: shouldSkipChache(operations),
    };
  };
};

export default pipelineCreator;
