import downfit from './downfit';
import sharp from '../../tests/mocks/sharp.mock';

describe('Downfit', () => {
  const fn = downfit({ image: sharp, otherOps: [] });

  beforeEach(() => {
    sharp.mockClear();
  });

  test('resize if image width and height are both larger then desired', async () => {
    await fn({ width: 300, height: 300 });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  });
});
