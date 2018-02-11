const blur = require('../../src/normalizers/blur');

describe('Blur', () => {
  test('blur returns a transformation', () => {
    expect(blur(10)).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'blur',
          operation: 'blur',
          params: [10],
        },
      ],
    }));
  });

  test('throw if value is not valid', () => {
    expect(() => blur(-10)).toThrow();
    expect(() => blur(10e6)).toThrow();
  });
});

