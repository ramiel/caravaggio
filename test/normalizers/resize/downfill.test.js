const downfill = require('normalizers/resize/downfill');
const sharp = require('../../mocks/sharp.mock');

describe('Down fill', () => {
  const fn = downfill(sharp);

  beforeEach(() => {
    sharp.mockClear();
  });

  test('resize filling the image with center gravity by default', async () => {
    await fn(300, 300);
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { withoutEnlargement: true });
  });

  test('resize filling the image with east gravity', async () => {
    await fn(300, 300, 'ge');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { withoutEnlargement: true, position: 'east' });
  });


  test('do not fill if the image is smaller then target resolution', async () => {
    await fn(800, 800, 'ge');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(800, 800, { withoutEnlargement: true, position: 'east' });
  });

  test('do not accept a inexistent gravity valule', async () => {
    await expect(fn(800, 800, 'gimagine')).rejects.toBeDefined();
  });

  test('resize filling the image with auto gravity', async () => {
    await fn(300, 300, 'gauto');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { withoutEnlargement: true, position: 'attention' });
  });
});
