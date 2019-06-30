const config = require('config');
const { convert } = require('../../src/pipelines/index')(config);
const { parseOptions } = require('../../src/parser')(config);

jest.mock('../../src/logger');

const imageUrl = 'http://res.cloudinary.com/ramiel/image/upload/v1478374142/gomitolo2_bxd1ti.png';

describe('Pipeline', () => {
  test('one operation', async () => {
    const options = parseOptions('rotate_90');
    const buffer = await convert(imageUrl, options);
    expect(buffer).toBeInstanceOf(Buffer);
  });
});

