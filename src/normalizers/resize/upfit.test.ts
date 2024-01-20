import sharp from '../../tests/mocks/sharp.mock';
import upfit from './upfit';

describe('Upfit', () => {
  const fn = upfit({ image: sharp, otherOps: [] });

  beforeEach(() => {
    sharp.mockClear();
  });

  test('do nothing if the image is larger', async () => {
    sharp.metadata.mockResolvedValueOnce({ width: 400, height: 400 });
    await fn({ width: 300, height: 300 });
    expect(sharp.resize).not.toHaveBeenCalled();
  });

  test('not resize if one is larger', async () => {
    sharp.metadata.mockResolvedValueOnce({ width: 400, height: 150 });
    await fn({ width: 300, height: 300 });
    expect(sharp.resize).not.toHaveBeenCalled();
  });

  test('resize fitting the image', async () => {
    sharp.metadata.mockResolvedValueOnce({ width: 200, height: 160 });
    await fn({ width: 300, height: 300 });
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { fit: 'inside' });
  });
});
