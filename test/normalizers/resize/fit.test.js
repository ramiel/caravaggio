const fitresize = require('../../../src/normalizers/resize/fit');
const { createPipeline } = require('../../mocks/pipeline');

describe('Fit', () => {
  test('resize fitting the image', async () => {
    const pipeline = createPipeline('http://any.com/any.jpeg');
    const operations = await fitresize(pipeline)(300, 300);
    expect(operations).toEqual([
      {
        name: 'resize_fit',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_fit',
        operation: 'max',
        params: [],
      },
    ]);
  });
});
