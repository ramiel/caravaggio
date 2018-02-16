const config = require('config');
const sharp = require('sharp');
const downfit = require('normalizers/resize/downfit');
const { parseOptions } = require('parser')(config);
const { convert } = require('pipelines/index');
const { createPipeline } = require('mocks/pipeline');

describe('Downfit', () => {
  test('resize if image width and height are both larger then desired', async () => {
    const pip = createPipeline('http://any.com/little.jpeg');
    pip.setMetadata({ width: 640, height: 480 });
    const operations = await downfit(pip)(300, 300);
    expect(operations).toEqual([
      {
        name: 'resize_downfit',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_downfit',
        operation: 'max',
        params: [],
      },
      {
        name: 'resize_downfit',
        operation: 'withoutEnlargement',
        params: [],
      },
    ]);
  });

  test('resize if only image width is larger then desired', async () => {
    const pip = createPipeline('http://any.com/little.jpeg');
    pip.setMetadata({ width: 450, height: 150 });
    const operations = await downfit(pip)(300, 300);
    expect(operations).toEqual([
      {
        name: 'resize_downfit',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_downfit',
        operation: 'max',
        params: [],
      },
      {
        name: 'resize_downfit',
        operation: 'withoutEnlargement',
        params: [],
      },
    ]);
  });

  test('resize if only image height is larger then desired', async () => {
    const pip = createPipeline('http://any.com/little.jpeg');
    pip.setMetadata({ width: 150, height: 450 });
    const operations = await downfit(pip)(300, 300);
    expect(operations).toEqual([
      {
        name: 'resize_downfit',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_downfit',
        operation: 'max',
        params: [],
      },
      {
        name: 'resize_downfit',
        operation: 'withoutEnlargement',
        params: [],
      },
    ]);
  });

  test('do nothing if both are smaller', async () => {
    const pip = createPipeline('http://any.com/little.jpeg');
    pip.setMetadata({ width: 150, height: 150 });
    const operations = await downfit(pip)(300, 300);
    expect(operations).toEqual([
      {
        name: 'resize_downfit',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_downfit',
        operation: 'max',
        params: [],
      },
      {
        name: 'resize_downfit',
        operation: 'withoutEnlargement',
        params: [],
      },
    ]);
  });

  describe('through pipeline', () => {
    const imageUrl = '300x300.jpg';

    test('resize if image width and height are both larger then desired', async () => {
      const options = parseOptions('rs_200x200_downfit');
      const { width, height } = await sharp(await convert(imageUrl, options)).metadata();
      expect(width).toBe(200);
      expect(height).toBe(200);
    });

    test('resize if only image width is larger then desired', async () => {
      const options = parseOptions('rs_200x400_downfit');
      const { width, height } = await sharp(await convert(imageUrl, options)).metadata();
      expect(width).toBe(200);
      expect(height).toBeLessThan(300);
    });

    test('do nothing if both are smaller', async () => {
      const options = parseOptions('rs_400x400_downfit');
      const { width, height } = await sharp(await convert(imageUrl, options)).metadata();
      expect(width).toBe(300);
      expect(height).toBe(300);
    });
  });
});
