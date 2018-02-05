const { parseOptions } = require('../../src/parser');
const { convert } = require('../../src/pipelines/index');

const imageUrl = 'http://res.cloudinary.com/ramiel/image/upload/v1478374142/gomitolo2_bxd1ti.png';

describe('Pipeline - resize', () => {
  test('resize percentage operation (width and height)', async () => {
    const options = parseOptions('resize_0.9x0.4');
    const buffer = await convert(imageUrl, options);
    expect(buffer).toBeInstanceOf(Buffer);
  });

  test('resize percentage operation (width only)', async () => {
    const options = parseOptions('resize_0.9x');
    const buffer = await convert(imageUrl, options);
    expect(buffer).toBeInstanceOf(Buffer);
  });

  test('resize percentage operation (height only)', async () => {
    const options = parseOptions('resize_x0.9');
    const buffer = await convert(imageUrl, options);
    expect(buffer).toBeInstanceOf(Buffer);
  });
});

