import { Normalizer } from '.';
import cohercer from '../utils/cohercer';
import { RawOperation } from '../utils/operationParser';
import { isPercentage, percentageToPixel } from '../utils/misc';

interface ExtractRawOp extends RawOperation {
  x: string;
  y: string;
  w: string;
  h: string;
}

function isImageWidthAvailable(
  iw: number | undefined,
  isPercentageWidth: boolean,
  isPercentageLeft: boolean
): iw is number {
  return iw !== undefined || (!isPercentageWidth && !isPercentageLeft);
}

function isImageHeightAvailable(
  ih: number | undefined,
  isPercentageHeight: boolean,
  isPercentageTop: boolean
): ih is number {
  return ih !== undefined || (!isPercentageHeight && !isPercentageTop);
}

const extract: Normalizer<ExtractRawOp> = ({ x, y, w, h }) => {
  const left = cohercer(
    x,
    'Extract: the x parameter in in the wrong format.',
    'extract.html'
  )
    .toFloat()
    .value();

  const top = cohercer(
    y,
    'Extract: the y parameter in in the wrong format.',
    'extract.html'
  )
    .toFloat()
    .value();

  const width = cohercer(
    w,
    'Extract: the y parameter in in the wrong format.',
    'extract.html'
  )
    .toFloat()
    .value();

  const height = cohercer(
    h,
    'Extract: the y parameter in in the wrong format.',
    'extract.html'
  )
    .toFloat()
    .value();

  return [
    {
      name: 'extract',
      op: async ({ image }) => {
        // const [width, height] = await getWidthAndHeight(s, image);
        const { width: iw, height: ih } = await image.metadata();
        const isPercentageTop = isPercentage(y);
        const isPercentageLeft = isPercentage(x);
        const isPercentageWidth = isPercentage(w);
        const isPercentageHeight = isPercentage(h);

        if (!isImageWidthAvailable(iw, isPercentageWidth, isPercentageLeft)) {
          throw new Error(
            'Cannot extract percentage described portion for this image which size is not defined'
          );
        }

        if (!isImageHeightAvailable(ih, isPercentageHeight, isPercentageTop)) {
          throw new Error(
            'Cannot extract percentage described portion for this image which size is not defined'
          );
        }

        const extractOptions = {
          left: isPercentageLeft ? percentageToPixel(left, iw) : left,
          top: isPercentageTop ? percentageToPixel(top, ih) : top,
          width: isPercentageWidth ? percentageToPixel(width, iw) : width,
          height: isPercentageHeight ? percentageToPixel(height, ih) : height,
        };
        return image.extract(extractOptions);
      },
      params: [
        {
          left,
          top,
          width,
          height,
        },
      ],
    },
  ];
};

export default extract;
