const fill = require('../../../src/normalizers/resize/fill');
const sharp = require('../../mocks/sharp.mock');


describe('Fill', () => {
  const fn = fill(sharp);

  beforeEach(() => {
    sharp.mockClear();
  });

  test('resize filling the image with center gravity by default', async () => {
    await fn(300, 300);
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { fit: 'cover' });
  });

  test('resize filling the image with east gravity', async () => {
    await fn(300, 300, 'ge');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { fit: 'cover', position: 'east' });
  });

  test('resize filling the image with auto gravity', async () => {
    await fn(300, 300, 'gauto');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { fit: 'cover', position: 'attention' });
  });

  test('do not accept a inexistent gravity valule', async () => {
    await expect(fn(200, 300, 'gimagine')).rejects.toBeDefined();
  });
});
