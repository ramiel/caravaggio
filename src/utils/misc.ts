import { Sharp } from 'sharp';
import { Operation } from '../normalizers';

const jsonReplacer = (key: string | null, value: unknown): unknown => {
  if (Buffer.isBuffer(value)) {
    return `<Buffer of ${value.length} bytes>`;
  }
  if (Array.isArray(value)) {
    return value.map((v) => jsonReplacer(null, v));
  }
  return value;
};

export const stringifyParams = (params: Array<unknown>) =>
  JSON.stringify(params, jsonReplacer, '');

/**
 * Returns the desired output.
 * If an `o` option is specified is used. If it's not specified, or it's `original`,
 * the metadata are checked in the sharp pipeline
 */
export const getOutputType = async (
  sharp: Sharp,
  operations: Operation[]
): Promise<string | undefined> => {
  const outputOp = operations.find((op) => {
    return op.name === 'o';
  });
  if (!outputOp || outputOp.params[0] === 'original') {
    return (await sharp.metadata()).format;
  }
  return outputOp.params[0] as string;
};

export const isPercentage = (percentage: string | number | null) =>
  `${percentage}`.indexOf('.') !== -1;

export const percentageToPixel = (percentage: number, dimension: number) =>
  Math.round(percentage * dimension);

export const buildDocumentationLink = (doc: string | null, stripExt = true) =>
  doc
    ? `https://caravaggio.ramielcreations.com/docs/${
        stripExt ? doc.replace('.html', '') : doc
      }`
    : 'https://caravaggio.ramielcreations.com/docs';

// eslint-disable-next-line @typescript-eslint/ban-types
export const compose = (...fns: Function[]) =>
  fns.reduce((f, g) => (...args: unknown[]) => f(g(...args)));
