const extract = require('normalizers/extract');
const { createPipeline } = require('mocks/pipeline');

describe('Extract', () => {
  test('extract the desired sub image', async () => {
    const extractGenerator = extract('95', '35', '100', '200').transformations[0].operation;
    const pip = createPipeline('http://any.com/little.jpeg');
    pip.setMetadata({ width: 640, height: 480 });
    const operations = await extractGenerator(pip);
    expect(operations).toEqual([
      {
        name: 'extract',
        operation: 'extract',
        params: [{
          left: 95, top: 35, width: 100, height: 200,
        }],
      },
    ]);
  });

  test('all parameters can be expressed as percentage', async () => {
    const extractGenerator = extract('0.1', '0.1', '0.5', '0.5').transformations[0].operation;
    const pip = createPipeline('http://any.com/little.jpeg');
    pip.setMetadata({ width: 640, height: 480 });
    const operations = await extractGenerator(pip);
    expect(operations).toEqual([
      {
        name: 'extract',
        operation: 'extract',
        params: [{
          left: 64, top: 48, width: 320, height: 240,
        }],
      },
    ]);
  });

  test('a missing parameter throws an error', () => {
    expect(() => extract('50', '50', '10')).toThrow();
  });

  test('a wrong format parameter throws an error', () => {
    expect(() => extract('50', '50', 'aba', '200')).toThrow();
  });
});
