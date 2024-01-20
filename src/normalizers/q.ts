import { Normalizer } from '.';
import cohercer from '../utils/cohercer';
import { getOutputType } from '../utils/misc';
import { RawOperation } from '../utils/operationParser';

interface QRawOp extends RawOperation {
  value: string;
}

const normalizeQ = (value: number) => Math.round((value * 80) / 100);

const q: Normalizer<QRawOp> = ({ value }) => {
  const v = cohercer(
    value,
    'Quality must be a value between 1 and 100.',
    'quality.html',
  )
    .toInt()
    .min(1)
    .max(100)
    .value();

  return [
    {
      name: 'q',
      op: async ({ image, otherOps }) => {
        const format = await getOutputType(image, otherOps);
        switch (format) {
          case 'jpeg':
          case 'jpg':
            return image.jpeg({ quality: normalizeQ(v) });
          case 'webp':
          case 'tiff':
            return image[format]({ quality: normalizeQ(v) });
          default:
            return image;
        }
      },
      params: [v],
    },
  ];
};

export default q;
