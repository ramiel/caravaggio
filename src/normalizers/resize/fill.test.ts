import fill from './fill';
import sharp from '../../tests/mocks/sharp.mock';
import { GRAVITY } from '../../utils/gravity';

describe('Fill', () => {
  const fn = fill({ image: sharp, otherOps: [] });

  beforeEach(() => {
    sharp.mockClear();
  });

  test('resize filling the image with center gravity by default', async () => {
    await fn({ width: 300, height: 300 });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { fit: 'cover' });
  });

  test('resize filling the image with east gravity', async () => {
    await fn({ width: 300, height: 300, gravity: GRAVITY.e });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'cover',
      position: 'east',
    });
  });

  test('resize filling the image with auto gravity', async () => {
    await fn({ width: 300, height: 300, gravity: GRAVITY.auto });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'cover',
      position: 'attention',
    });
  });
});
