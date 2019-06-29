const fitresize = require('../../../src/normalizers/resize/fit');
const sharp = require('../../mocks/sharp.mock');


describe('Fit', () => {
  const fn = fitresize(sharp);

  beforeEach(() => {
    sharp.mockClear();
  });

  test('resize fitting the image', async () => {
    await fn(300, 300);
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, { fit: 'inside' });
  });
});
