const upfit = require('normalizers/resize/upfit');
const sharp = require('../../mocks/sharp.mock');

describe('Upfit', () => {
  const fn = upfit(sharp);

  beforeEach(() => {
    sharp.mockClear();
  });

  test('do nothing if the image is larger', async () => {
    sharp.metadata.mockResolvedValueOnce({ width: 400, height: 400 });
    await fn(300, 300);
    expect(sharp.resize).not.toHaveBeenCalled();
  });

  test('not resize if one is larger', async () => {
    sharp.metadata.mockResolvedValueOnce({ width: 400, height: 150 });
    await fn(300, 300);
    expect(sharp.resize).not.toHaveBeenCalled();
  });

  test('resize fitting the image', async () => {
    sharp.metadata.mockResolvedValueOnce({ width: 200, height: 160 });
    await fn(300, 300);
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { fit: 'inside' });
  });
});

