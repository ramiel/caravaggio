const config = require('config');
const sharp = require('sharp');
const upfit = require('normalizers/resize/upfit');
const { createPipeline } = require('mocks/pipeline');
const { parseOptions } = require('parser')(config);
const { convert } = require('pipelines/index');

describe('Upfit', () => {
  // metadata 640x480 where not specified
  const pipeline = createPipeline('http://any.com/any.jpeg');
  const getUpfit = upfit(pipeline);

  test('do nothing if the image is larger', async () => {
    const operations = await getUpfit(300, 300);
    expect(operations).toEqual([]);
  });

  test('not resize if one is larger', async () => {
    const operations = await getUpfit(800, 300);
    expect(operations).toEqual([]);
  });

  test('resize fitting the image', async () => {
    const pip = createPipeline('http://any.com/little.jpeg');
    pip.setMetadata({ width: 150, height: 150 });
    const operations = await upfit(pip)(300, 300);
    expect(operations).toEqual([
      {
        name: 'resize_upfit',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_upfit',
        operation: 'max',
        params: [],
      },
    ]);
  });

  describe('through pipeline', () => {
    const imageUrl = '300x300.jpg';

    test('resize if image width and height are both smaller then desired', async () => {
      const options = parseOptions('rs_400x400_upfit');
      const { width, height } = await sharp(await convert(imageUrl, options)).metadata();
      expect(width).toBe(400);
      expect(height).toBe(400);
    });

    test('do not resize if only image width is larger then desired', async () => {
      const options = parseOptions('rs_200x400_upfit');
      const { width, height } = await sharp(await convert(imageUrl, options)).metadata();
      expect(width).toBe(300);
      expect(height).toBe(300);
    });

    test('do not resize if only image height is larger then desired', async () => {
      const options = parseOptions('rs_400x200_upfit');
      const { width, height } = await sharp(await convert(imageUrl, options)).metadata();
      expect(width).toBe(300);
      expect(height).toBe(300);
    });
  });
});

