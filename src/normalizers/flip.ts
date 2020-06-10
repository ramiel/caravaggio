import { Normalizer } from '.';
import cohercer from '../utils/cohercer';
import { RawOperation } from '../utils/operationParser';

interface FlipRawOp extends RawOperation {
  value: string;
}
const flip: Normalizer<FlipRawOp> = ({ value }) => {
  const operation =
    value !== 'true'
      ? cohercer(value, 'Flip accepts "x" or "y" as values.', 'flip.html')
          .toString()
          .enum(['x', 'y'])
          .value()
          .toLowerCase()
      : 'x';

  const method = !operation || operation === 'x' ? 'flop' : 'flip';

  return [
    {
      name: 'flip',
      op: async ({ image }) => image[method](),
      params: [operation],
    },
  ];
};

export default flip;
