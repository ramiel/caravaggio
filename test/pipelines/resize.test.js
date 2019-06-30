const config = require('config');
const { parseOptions } = require('../../src/parser')(config);
const { convert } = require('../../src/pipelines/index')(config);

jest.mock('../../src/logger');

const imageUrl = '300x300.jpg';

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

