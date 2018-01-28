const { parseOptions } = require('../src/parser');
const { convert } = require('../src/pipeline');

const imageUrl = 'http://res.cloudinary.com/ramiel/image/upload/v1478374142/gomitolo2_bxd1ti.png';

describe('Pipeline', () => {
  test('one operation', async () => {
    const options = parseOptions('rotate_90');
    const buffer = await convert(imageUrl, options);
    expect(buffer).toBeInstanceOf(Buffer);
  });
});

