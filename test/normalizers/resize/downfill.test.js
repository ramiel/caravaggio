const config = require('config');
const sharp = require('sharp');
const downfill = require('normalizers/resize/downfill');
const { createPipeline } = require('mocks/pipeline');
const { parseOptions } = require('parser')(config);
const { convert } = require('pipelines/index');

describe('Down fill', () => {
  const pipeline = createPipeline('http://any.com/any.jpeg');
  const getFill = downfill(pipeline);

  test('resize filling the image with center gravity by default', async () => {
    const operations = await getFill(300, 300);
    expect(operations).toEqual([
      {
        name: 'resize_downfill',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_downfill',
        operation: 'crop',
        params: [],
      },
      {
        name: 'resize_downfill',
        operation: 'withoutEnlargement',
        params: [],
      },
    ]);
  });

  test('resize filling the image with east gravity', async () => {
    const operations = await getFill(300, 300, 'ge');
    expect(operations).toEqual([
      {
        name: 'resize_downfill',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_downfill',
        operation: 'crop',
        params: ['east'],
      },
      {
        name: 'resize_downfill',
        operation: 'withoutEnlargement',
        params: [],
      },
    ]);
  });


  test('do not fill if the image is smaller then target resolution', async () => {
    const operations = await getFill(800, 800, 'ge');
    expect(operations).toEqual([
      {
        name: 'resize_downfill',
        operation: 'resize',
        params: [800, 800],
      },
      {
        name: 'resize_downfill',
        operation: 'crop',
        params: ['east'],
      },
      {
        name: 'resize_downfill',
        operation: 'withoutEnlargement',
        params: [],
      },
    ]);
  });

  test('do not accept a inexistent gravity valule', async () => {
    expect(getFill(200, 300, 'gimagine')).rejects.toBeDefined();
  });

  test('resize filling the image with auto gravity', async () => {
    const operations = await getFill(300, 300, 'gauto');
    expect(operations).toEqual([
      {
        name: 'resize_downfill',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_downfill',
        operation: 'crop',
        params: ['attention'],
      },
      {
        name: 'resize_downfill',
        operation: 'withoutEnlargement',
        params: [],
      },
    ]);
  });

  describe('through pipeline', () => {
    const imageUrl = '300x300.jpg';

    test('fill the image if it is larger than target', async () => {
      const options = parseOptions('rs_200x200_downfill');
      const { width, height } = await sharp(await convert(imageUrl, options)).metadata();
      expect(width).toBe(200);
      expect(height).toBe(200);
    });

    test('fill the image if width is larger than target', async () => {
      const options = parseOptions('rs_400x100_downfill');
      const { width, height } = await sharp(await convert(imageUrl, options)).metadata();
      expect(width).toBe(300);
      expect(height).toBe(300);
    });

    test('do not fill the image if it is smaller than target', async () => {
      const options = parseOptions('rs_400x400_downfill');
      const { width, height } = await sharp(await convert(imageUrl, options)).metadata();
      expect(width).toBe(300);
      expect(height).toBe(300);
    });
  });
});
