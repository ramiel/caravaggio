const config = require('config');
const { parseOptions } = require('../../src/parser')(config);
const { convert } = require('../../src/pipelines/index');

describe('Pipeline - blur', () => {
  test('blur', async () => {
    const options = parseOptions('blur_10');
    const buffer = await convert('http://res.cloudinary.com/ramiel/image/upload/v1478374142/gomitolo2_bxd1ti.png', options);
    expect(buffer).toBeInstanceOf(Buffer);
  });
});

