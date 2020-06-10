import embed from './embed';
import sharp from '../../tests/mocks/sharp.mock';
import { GRAVITY } from '../../utils/gravity';

describe('Embed', () => {
  const fn = embed({ image: sharp, otherOps: [] });

  beforeEach(() => {
    sharp.mockClear();
  });

  test('embed the image', async () => {
    await fn({ width: 300, height: 300 });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
    });
  });

  test('embed the image with gravity', async () => {
    await fn({ width: 300, height: 300, gravity: GRAVITY.north });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      position: 'north',
    });
  });

  test('embed the image with background color', async () => {
    await fn({
      width: 300,
      height: 300,
      background: { r: 0, g: 0, b: 255, alpha: 1 },
    });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      background: {
        r: 0,
        g: 0,
        b: 255,
        alpha: 1,
      },
    });
  });

  test('embed the image with background color and gravity', async () => {
    await fn({
      width: 300,
      height: 300,
      background: { r: 0, g: 0, b: 255, alpha: 1 },
      gravity: GRAVITY.center,
    });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      position: 'center',
      background: {
        r: 0,
        g: 0,
        b: 255,
        alpha: 1,
      },
    });
  });

  test('embed the image with background color and gravity (2)', async () => {
    await fn({
      width: 300,
      height: 300,
      background: { r: 0, g: 0, b: 255, alpha: 1 },
      gravity: GRAVITY.east,
    });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      position: 'east',
      background: {
        r: 0,
        g: 0,
        b: 255,
        alpha: 1,
      },
    });
  });

  test('embed the image with background color and alpha', async () => {
    await fn({
      width: 300,
      height: 300,
      background: { r: 0, g: 0, b: 255, alpha: 0.5 },
      gravity: GRAVITY.e,
    });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      position: 'east',
      background: {
        r: 0,
        g: 0,
        b: 255,
        alpha: 0.5,
      },
    });
  });
});
