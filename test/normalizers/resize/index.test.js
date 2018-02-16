const resize = require('normalizers/resize');
const { createPipeline } = require('mocks/pipeline');

describe('Resize', () => {
  const url = 'http://any.com/any.jpeg';
  const pipeline = createPipeline(url);
  const getResize = async (...params) => resize(...params).transformations[0].operation(pipeline);

  test('mode must be available', async () => {
    expect(getResize('200x300', 'fantasycrop')).rejects.toBeDefined();
  });

  test('mode scale is available', async () => {
    await expect(getResize('200x300', 'scale')).resolves.toBeDefined();
  });

  test('mode fit is available', async () => {
    await expect(getResize('200x300', 'fit')).resolves.toBeDefined();
  });

  test('mode downfit is available', async () => {
    await expect(getResize('200x300', 'downfit')).resolves.toBeDefined();
  });

  test('mode upfit is available', async () => {
    await expect(getResize('200x300', 'upfit')).resolves.toBeDefined();
  });

  test('mode fill is available', async () => {
    await expect(getResize('200x300', 'fill')).resolves.toBeDefined();
  });

  test('mode downfill is available', async () => {
    await expect(getResize('200x300', 'downfill')).resolves.toBeDefined();
  });

  test('mode embed is available', async () => {
    await expect(getResize('200x300', 'embed')).resolves.toBeDefined();
  });

  test('width and heigth can be passed', async () => {
    const result = await getResize('200x300');
    expect(result).toEqual([{
      name: 'resize',
      operation: 'resize',
      params: [200, 300],
    }]);
  });

  test('only width can be passed', async () => {
    const result = await getResize('200x');
    expect(result).toEqual([{
      name: 'resize',
      operation: 'resize',
      params: [200, null],
    }]);
  });

  test('only width can be passed and the aspect ratio can be ignored', async () => {
    const result = await getResize('200x', 'scale', 'iar');
    expect(result).toEqual([{
      name: 'resize',
      operation: 'resize',
      params: [200, null],
    }, {
      name: 'resize',
      operation: 'ignoreAspectRatio',
      params: [],
    }]);
  });

  test('only height can be passed', async () => {
    const result = await getResize('x300');
    expect(result).toEqual([{
      name: 'resize',
      operation: 'resize',
      params: [null, 300],
    }]);
  });

  test('just a number is intended as width', async () => {
    const result = await getResize('200');
    expect(result).toEqual([{
      name: 'resize',
      operation: 'resize',
      params: [200, null],
    }]);
  });

  test('a non number throws an error', async () => {
    expect(getResize('abc')).rejects.toBeDefined();
  });

  test('a wrong height will throw', async () => {
    expect(getResize('200xabc')).rejects.toBeDefined();
  });

  test('a wrong height and a missing "x" will throw', async () => {
    expect(getResize('200abc')).rejects.toBeDefined();
  });

  test('the percentage is calculated', async () => {
    const { width, height } = await pipeline.getMetadata();
    const result = await getResize('0.8x0.9');
    expect(result).toEqual([{
      name: 'resize',
      operation: 'resize',
      params: [width * 0.8, height * 0.9],
    }]);
  });
});
