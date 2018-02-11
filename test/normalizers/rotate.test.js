const rotate = require('../../src/normalizers/rotate');

describe('Rotate', () => {
  test('Accept multiple of 90°', () => {
    expect(rotate('180')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'rotate',
          operation: 'rotate',
          params: [180],
        },
      ],
    }));
  });

  test('Accept negative multiple of 90°', () => {
    expect(rotate('-180')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'rotate',
          operation: 'rotate',
          params: [-180],
        },
      ],
    }));
  });

  test('Accept multiple of 90° beyond 360°', () => {
    expect(rotate('450')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'rotate',
          operation: 'rotate',
          params: [450],
        },
      ],
    }));
  });

  test('throw if the angle is not a number', () => {
    expect(() => rotate('abc')).toThrow();
  });

  test('throw if the angle is not a multiple of 90°', () => {
    expect(() => rotate('40')).toThrow();
  });
});

