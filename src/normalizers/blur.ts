import { Normalizer } from '.';
import cohercer from '../utils/cohercer';
import { RawOperation } from '../utils/operationParser';

interface BlurRawOp extends RawOperation {
  value: string;
}

const blur: Normalizer<BlurRawOp> = ({ value }) => {
  const v = cohercer(
    value,
    'Blur must be a value between 0.3 and 1000.',
    'blur.html'
  )
    .toFloat()
    .min(0.3)
    .max(1000)
    .value();

  return [
    {
      name: 'blur',
      op: async ({ image: sharp }) => sharp.blur(v),
      params: [v],
    },
  ];
};

export default blur;
