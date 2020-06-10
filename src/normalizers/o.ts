import { Normalizer, Operation } from '.';
import cohercer from '../utils/cohercer';
import { RawOperation } from '../utils/operationParser';

interface ORawOp extends RawOperation {
  value: string;
}

const o: Normalizer<ORawOp> = ({ value }) => {
  const format = cohercer(
    value,
    'Accepted values are "original", jpg", "jpeg", "png", "webp", "tiff".',
    'output.html'
  )
    .toString()
    .enum(['original', 'jpg', 'jpeg', 'png', 'webp', 'tiff'])
    .value()
    .toLowerCase() as typeof value;

  let fn: Operation['op'];

  switch (format) {
    case 'jpg':
    case 'jpeg':
      fn = async ({ image }) => image.jpeg();
      break;
    case 'png':
    case 'webp':
    case 'tiff':
      fn = async ({ image }) => image[format]();
      break;
    default:
      return [];
  }

  return [
    {
      name: 'o',
      op: fn,
      params: [format],
    },
  ];
};

export default o;
