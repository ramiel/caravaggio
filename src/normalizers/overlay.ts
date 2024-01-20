import { Normalizer } from '.';
import { Context } from '..';
import cohercer from '../utils/cohercer';
import { GRAVITY, getGravityFromParameter } from '../utils/gravity';
import imageLoader from '../utils/imageLoader';
import { isPercentage, percentageToPixel } from '../utils/misc';
import { RawOperation } from '../utils/operationParser';

interface OverlayRawOp extends RawOperation {
  url: string;
  g?: string;
  x?: string;
  y?: string;
  watermark?: string;
}

const overlay = (context: Context): Normalizer<OverlayRawOp> => {
  const { get: inputImageLoader } = imageLoader(context);

  return ({ url: overlayUrl, g, watermark: wtrmrk, x, y }) => {
    const gravity = getGravityFromParameter(g);
    const watermark = !!wtrmrk && cohercer(wtrmrk).toBool().value();

    const url = cohercer(
      overlayUrl,
      'Overlay, url is mandatory',
      'overlay.html',
    )
      .toString()
      .value();

    const left = x
      ? cohercer(
          x,
          'Extract: the x parameter in in the wrong format.',
          'overlay.html',
        )
          .toFloat()
          .value()
      : undefined;

    const top = y
      ? cohercer(
          y,
          'Extract: the x parameter in in the wrong format.',
          'overlay.html',
        )
          .toFloat()
          .value()
      : undefined;

    return [
      {
        name: 'overlay',
        op: async ({ image, req }) => {
          let overlay: Buffer;
          try {
            overlay = (await inputImageLoader(url, req)) as Buffer;
          } catch (e) {
            throw new Error(
              `An error occurred while getting overlay image. ${
                (e as Error).message
              }`,
            );
          }
          const { width: iw, height: ih } = await image.metadata();

          const options: {
            gravity?: GRAVITY;
            tile?: boolean;
            left?: number;
            top?: number;
          } = {
            gravity,
            tile: !!watermark,
          };
          if (left !== undefined) {
            options.left = isPercentage(left)
              ? percentageToPixel(left, iw as number)
              : left;
          }
          if (top !== undefined) {
            options.top = isPercentage(top)
              ? percentageToPixel(top, ih as number)
              : top;
          }
          if (options.top !== undefined && !options.left) {
            options.left = 0;
          }
          if (!options.top && options.left !== undefined) {
            options.top = 0;
          }

          return image.composite([{ input: overlay, ...options }]);
        },
        params: [
          {
            url,
            x: left,
            y: top,
            g: gravity,
            watermark,
          },
        ],
      },
    ];

    // return {
    //   transformations: [
    //     {
    //       name: 'overlay',
    //       params: [overlayUrl, ...params],
    //       fn: async (sharp) => {
    //         let overlay;
    //         try {
    //           overlay = await image.get(url);
    //         } catch (e) {
    //           throw new Error(
    //             `An error occurred while getting overlay image. ${e.message}`
    //           );
    //         }
    //         const { width: iw, height: ih } = await sharp.metadata();

    //         const options = {
    //           gravity,
    //           tile: !!watermark,
    //         };
    //         if (left !== undefined) {
    //           options.left = isPercentage(left)
    //             ? percentageToPixel(left, iw)
    //             : left;
    //         }
    //         if (top !== undefined) {
    //           options.top = isPercentage(top)
    //             ? percentageToPixel(top, ih)
    //             : top;
    //         }
    //         if (options.top !== undefined && !options.left) {
    //           options.left = 0;
    //         }
    //         if (!options.top && options.left !== undefined) {
    //           options.top = 0;
    //         }
    //         return sharp.composite([{ input: overlay, ...options }]);
    //       },
    //     },
    //   ],
    // };
  };
};

export default overlay;
