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
});

