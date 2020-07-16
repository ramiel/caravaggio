import { Sharp } from 'sharp';
import { RawOperation } from '../utils/operationParser';
import { Context } from '..';
import blur from './blur';
import o from './o';
import q from './q';
import UnknownOperationError from '../errors/UnknownOperationError';
import duotone from './duotone';
import extract from './extract';
import flip from './flip';
import overlay from './overlay';
import progressive from './progressive';
import rotate from './rotate';
import resize from './resize';
import { ServerRequest } from 'microrouter';
export interface Operation {
  name: string;
  op: (opt: {
    image: Sharp;
    otherOps: Array<Operation>;
    req: ServerRequest;
  }) => Promise<Sharp>;
  params: Array<unknown>;
  skipCache?: boolean;
}

export type Normalizer<O extends RawOperation = RawOperation> = (
  rawOp: O
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
        return [...acc, ...normalizer(rawOp)];
      }, []);
      return operations;
    },
  };
};

export default normalizer;
