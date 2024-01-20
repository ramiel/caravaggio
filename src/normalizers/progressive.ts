import { Normalizer } from '.';
import cohercer from '../utils/cohercer';
import { getOutputType } from '../utils/misc';
import { RawOperation } from '../utils/operationParser';

interface ProgressiveRawOp extends RawOperation {
  value: string;
}

const progressive: Normalizer<ProgressiveRawOp> = ({ value }) => {
  const progressive = cohercer(
    value,
    'Progressive value is not valid.',
    'progressive.html',
  )
    .toBool()
    .value();

  return [
    {
      name: 'progressive',
      op: async ({ image, otherOps }) => {
        const format = await getOutputType(image, otherOps);
        switch (format) {
          case 'jpeg':
          case 'jpg':
            return image.jpeg({ progressive });
          case 'png':
            return image.png({ progressive });
          default:
            return image;
        }
      },
      params: [progressive],
    },
  ];
};

export default progressive;
