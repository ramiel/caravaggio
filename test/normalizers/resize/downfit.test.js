const downfit = require('normalizers/resize/downfit');
const sharp = require('../../mocks/sharp.mock');

describe('Downfit', () => {
  const fn = downfit(sharp);

  beforeEach(() => {
    sharp.mockClear();
  });

  test('resize if image width and height are both larger then desired', async () => {
    await fn(300, 300);
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { fit: 'inside', withoutEnlargement: true });
  });
});
