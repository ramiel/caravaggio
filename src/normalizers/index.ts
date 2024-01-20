import { ServerRequest } from 'microrouter';
import { Sharp } from 'sharp';
import { Context } from '..';
import UnknownOperationError from '../errors/UnknownOperationError';
import { RawOperation } from '../utils/operationParser';
import { CacheControlStrategy } from '../utils/sender';
import blur from './blur';
import duotone from './duotone';
import extract from './extract';
import flip from './flip';
import o from './o';
import overlay from './overlay';
import progressive from './progressive';
import q from './q';
import resize from './resize';
import rotate from './rotate';
export interface Operation {
  name: string;
  op: (opt: {
    image: Sharp;
    otherOps: Array<Operation>;
    req: ServerRequest;
  }) => Promise<Sharp>;
  params: Array<unknown>;
  cacheStrategy?: CacheControlStrategy;
}

export type Normalizer<O extends RawOperation = RawOperation> = (
  rawOp: O,
) => Operation[];

const normalizer = (context: Context) => {
  const normalizers: { [name: string]: Normalizer } = {
    blur: blur as Normalizer,
    duotone: duotone as Normalizer,
    ex: extract as Normalizer,
    extract: extract as Normalizer,
    flip: flip as Normalizer,
    o: o as Normalizer,
    overlay: overlay(context) as Normalizer,
    progressive: progressive as Normalizer,
    q: q as Normalizer,
    resize: resize as Normalizer,
    rs: resize as Normalizer,
    rotate: rotate as Normalizer,
  };

  return {
    normalize: (rawOperations: Array<RawOperation>) => {
      const operations = rawOperations.reduce<Operation[]>((acc, rawOp) => {
        const normalizer = normalizers[rawOp.operation];
        if (!normalizer) {
          throw new UnknownOperationError(rawOp.operation);
        }
        acc.push(...normalizer(rawOp));
        return acc;
      }, []);
      return operations;
    },
  };
};

export default normalizer;
