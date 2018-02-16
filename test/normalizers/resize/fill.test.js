const fill = require('../../../src/normalizers/resize/fill');
const { createPipeline } = require('../../mocks/pipeline');

describe('Fill', () => {
  const pipeline = createPipeline('http://any.com/any.jpeg');
  const getFill = fill(pipeline);

  test('resize filling the image with center gravity by default', async () => {
    const operations = await getFill(300, 300);
    expect(operations).toEqual([
      {
        name: 'resize_fill',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_fill',
        operation: 'crop',
        params: [],
      },
    ]);
  });

  test('resize filling the image with east gravity', async () => {
    const operations = await getFill(300, 300, 'ge');
    expect(operations).toEqual([
      {
        name: 'resize_fill',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_fill',
        operation: 'crop',
        params: ['east'],
      },
    ]);
  });

  test('resize filling the image with auto gravity', async () => {
    const operations = await getFill(300, 300, 'gauto');
    expect(operations).toEqual([
      {
        name: 'resize_fill',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_fill',
        operation: 'crop',
        params: ['attention'],
      },
    ]);
  });

  test('do not accept a inexistent gravity valule', async () => {
    expect(getFill(200, 300, 'gimagine')).rejects.toBeDefined();
  });
});
