const { parseOptions } = require('../../src/parser');
const { convert } = require('../../src/pipelines/index');

describe('Pipeline - quality', () => {
  test('having all information', async () => {
    const options = parseOptions('o_jpeg,q_10');
    const buffer = await convert('http://res.cloudinary.com/ramiel/image/upload/v1478374142/gomitolo2_bxd1ti.png', options);
    expect(buffer).toBeInstanceOf(Buffer);
  });

  test('getting an extension-less file', async () => {
    const options = parseOptions('q_10');
    const buffer = await convert('https://goo.gl/eSJWLs', options);
    expect(buffer).toBeInstanceOf(Buffer);
  });
});

