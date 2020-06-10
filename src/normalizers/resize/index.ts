import { Sharp } from 'sharp';
import { sizeToPixel } from '../../utils/sizes';
import { Normalizer, Operation } from '..';
import { RawOperation } from '../../utils/operationParser';
import cohercer from '../../utils/cohercer';
import { GRAVITY, getGravityFromParameter } from '../../utils/gravity';
import { Color, getColorFromParameter } from '../../utils/colors';
import scale from './scale';
import fit from './fit';
import downfit from './downfit';
import upfit from './upfit';
import fill from './fill';
import downfill from './downfill';
import embed from './embed';

export type ResizeModeOperator = (opt: {
  image: Sharp;
  otherOps: Operation[];
}) => (opt: {
  width: number | null;
  height: number | null;
  iar?: boolean;
  gravity?: GRAVITY;
  background?: Color;
}) => Promise<Sharp>;

const MODES: {
  [mode: string]: ResizeModeOperator;
} = {
  scale,
  fit,
  downfit,
  upfit,
  fill,
  downfill,
  embed,
};

const AVAILABLE_MODES = Object.keys(MODES);

const RESIZE_PATTERN = /^(\d+(.\d+)?x\d+(.\d+)?|\d+(.\d+)?x?|x\d+(.\d+)?)$/;

export interface ResizeRawOp extends RawOperation {
  s: string;
  m?: string;
  iar?: string;
  g?: string;
  b?: string;
}

/**
 *
 * @param {String} value Value in the format
 */
const resize: Normalizer<ResizeRawOp> = ({
  s,
  m = 'scale',
  iar: iarString,
  g,
  b,
}) => {
  const size = cohercer(
    s,
    'Resize: the size parameter is in the wrong format.',
    'resize.html#sizes'
  )
    .toString()
    .match(RESIZE_PATTERN)
    .value();

  const mode = cohercer(m, `Resize, the mode ${m} is not valid.`, 'resize.html')
    .toString()
    .enum(AVAILABLE_MODES)
    .value();

  const iar: boolean = !!iarString && cohercer(iarString).toBool().value();
  const gravity: GRAVITY | undefined = getGravityFromParameter(g, {
    acceptAuto: true,
  });
  const background: Color | undefined = b
    ? getColorFromParameter(b)
    : undefined;

  return [
    {
      name: 'resize',
      op: async ({ image, otherOps }) => {
        const [width, height] = await sizeToPixel(size, image);
        return MODES[mode]({ image, otherOps })({
          width,
          height,
          iar,
          gravity,
          background,
        });
      },
      params: [mode, size],
    },
  ];
};

export default resize;
