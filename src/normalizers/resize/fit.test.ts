import sharp from '../../tests/mocks/sharp.mock';
import fitFn from './fit';

describe('Fit', () => {
  const fn = fitFn({ image: sharp, otherOps: [] });

  beforeEach(() => {
    sharp.mockClear();
  });

  test('resize fitting the image', async () => {
    await fn({ width: 300, height: 300 });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { fit: 'inside' });
  });
});
