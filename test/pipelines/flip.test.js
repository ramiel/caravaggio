const config = require('config');
const { parseOptions } = require('../../src/parser')(config);
const { convert } = require('../../src/pipelines/index')(config);

jest.mock('../../src/logger');

describe('Pipeline - flip', () => {
  test('flip on x', async () => {
    const options = parseOptions('flip_x');
    const buffer = await convert('http://res.cloudinary.com/ramiel/image/upload/v1478374142/gomitolo2_bxd1ti.png', options);
    expect(buffer).toBeInstanceOf(Buffer);
  });

  test('flip on y', async () => {
    const options = parseOptions('flip_y');
    const buffer = await convert('http://res.cloudinary.com/ramiel/image/upload/v1478374142/gomitolo2_bxd1ti.png', options);
    expect(buffer).toBeInstanceOf(Buffer);
  });
});

