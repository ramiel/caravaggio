const blur = require('normalizers/blur');
const sharp = require('../mocks/sharp.mock');

describe('Blur', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('blur returns a transformation', () => {
    expect(blur(10)).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'blur',
          fn: expect.any(Function),
          params: [10],
        },
      ],
    }));
  });

  test('blur apply transformation', async () => {
    const { transformations: [{ fn }] } = blur(10);
    await fn(sharp);
    expect(sharp.blur).toHaveBeenCalledTimes(1);
    expect(sharp.blur).toHaveBeenCalledWith(10);
  });

  test('throw if value is not valid', () => {
    expect(() => blur(-10)).toThrow();
    expect(() => blur(10e6)).toThrow();
  });
});

