import downfill from './downfill';
import { GRAVITY } from '../../utils/gravity';
import sharp from '../../tests/mocks/sharp.mock';

describe('Down fill', () => {
  const fn = downfill({ image: sharp, otherOps: [] });

  beforeEach(() => {
    sharp.mockClear();
  });

  test('resize filling the image with center gravity by default', async () => {
    await fn({ width: 300, height: 300 });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      withoutEnlargement: true,
    });
  });

  test('resize filling the image with east gravity', async () => {
    await fn({ width: 300, height: 300, gravity: GRAVITY.east });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      withoutEnlargement: true,
      position: 'east',
    });
  });

  test('do not fill if the image is smaller then target resolution', async () => {
    await fn({ width: 800, height: 800, gravity: GRAVITY.east });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(800, 800, {
      withoutEnlargement: true,
      position: 'east',
    });
  });

  test('resize filling the image with auto gravity', async () => {
    await fn({ width: 300, height: 300, gravity: GRAVITY.auto });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      withoutEnlargement: true,
      position: 'attention',
    });
  });
});
