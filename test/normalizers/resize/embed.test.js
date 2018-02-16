const embed = require('normalizers/resize/embed');
const { createPipeline } = require('mocks/pipeline');

describe('Embed', () => {
  const pipeline = createPipeline('http://any.com/any.jpeg');
  const getEmbed = embed(pipeline);

  test('embed the image', async () => {
    const operations = await getEmbed(300, 300);
    expect(operations).toEqual([
      {
        name: 'resize_embed',
        operation: 'resize',
        params: [300, 300],
      },
      {
        name: 'resize_embed',
        operation: 'background',
        params: [{
          r: 0, g: 0, b: 0, alpha: 1,
        }],
      },
      {
        name: 'resize_embed',
        operation: 'embed',
        params: [],
      },
    ]);
  });

  test('embed the image with gravity', async () => {
    const operations = await getEmbed(300, 300, 'gn');
    expect(operations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'embed',
        params: ['north'],
      }),
    ]));
  });

  test('embed the image with background color', async () => {
    const operations = await getEmbed(300, 300, 'b000000255');
    expect(operations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'background',
        params: [{
          r: 0, g: 0, b: 255, alpha: 1,
        }],
      }),
    ]));
  });

  test('embed the image with background color and gravity', async () => {
    const operations = await getEmbed(300, 300, 'b000000255', 'gcenter');
    expect(operations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'embed',
        params: ['center'],
      }),
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'background',
        params: [{
          r: 0, g: 0, b: 255, alpha: 1,
        }],
      }),
    ]));
  });

  test('embed the image with gravity and background color', async () => {
    const operations = await getEmbed(300, 300, 'geast', 'b000000255');
    expect(operations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'background',
        params: [{
          r: 0, g: 0, b: 255, alpha: 1,
        }],
      }),
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'embed',
        params: ['east'],
      }),
    ]));
  });

  test('embed the image with background color and alpha', async () => {
    const operations = await getEmbed(300, 300, 'b000000255.5');
    expect(operations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'background',
        params: [{
          r: 0, g: 0, b: 255, alpha: 0.5,
        }],
      }),
    ]));
  });

  test('embed the image with background hexadecimal color', async () => {
    const operations = await getEmbed(300, 300, 'b0000FF');
    expect(operations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'background',
        params: [{
          r: 0, g: 0, b: 255, alpha: 1,
        }],
      }),
    ]));
  });

  test('embed the image with background hexadecimal color and alpha', async () => {
    const operations = await getEmbed(300, 300, 'b0000FF.9');
    expect(operations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'background',
        params: [{
          r: 0, g: 0, b: 255, alpha: 0.9,
        }],
      }),
    ]));
  });

  test('embed the image with gravity and background hexadecimal color', async () => {
    const operations = await getEmbed(300, 300, 'ge', 'bFF0000');
    expect(operations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'background',
        params: [{
          r: 255, g: 0, b: 0, alpha: 1,
        }],
      }),
      expect.objectContaining({
        name: 'resize_embed',
        operation: 'embed',
        params: ['east'],
      }),
    ]));
  });

  test('throw if the color is not in the correct form', async () => {
    expect(getEmbed(300, 300, 'ge', 'bFFF')).rejects.toBeDefined();
  });

  test('throw if the gravity is not in the correct form', async () => {
    expect(getEmbed(300, 300, 'gsnorth')).rejects.toBeDefined();
  });
});