import { RotateOptions } from 'sharp';
import { Normalizer } from '.';
import cohercer from '../utils/cohercer';
import { getColorFromParameter } from '../utils/colors';
import { RawOperation } from '../utils/operationParser';

interface RotateRawOp extends RawOperation {
  v: string;
  b?: string;
}

const rotate: Normalizer<RotateRawOp> = ({ v, b }) => {
  let angle: number | undefined;
  if (v !== 'auto') {
    angle = cohercer(v, 'Angle must be a number', 'rotate.html')
      .toInt()
      .value();
  } else {
    angle = undefined;
  }

  const options: RotateOptions = {};
  if (b) {
    options.background = getColorFromParameter(b);
  }

  return [
    {
      name: 'rotate',
      op: async ({ image }) => image.rotate(angle, options),
      params: [angle, options],
    },
  ];
};

export default rotate;
