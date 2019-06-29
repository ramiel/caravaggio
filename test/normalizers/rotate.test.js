const rotate = require('../../src/normalizers/rotate');
const sharp = require('../mocks/sharp.mock');

describe('Rotate', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('Accept multiple of 90°', () => {
    expect(rotate('180')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'rotate',
          fn: expect.any(Function),
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
          fn: expect.any(Function),
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
          fn: expect.any(Function),
          params: [450],
        },
      ],
    }));
  });

  test('Accept a custom angle', () => {
    expect(rotate('42')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'rotate',
          fn: expect.any(Function),
          params: [42],
        },
      ],
    }));
  });

  test('call rotate with the angle', async () => {
    const { transformations: [{ fn }] } = rotate('42');
    await fn(sharp);
    expect(sharp.rotate).toHaveBeenCalledTimes(1);
    expect(sharp.rotate).toHaveBeenCalledWith(42);
  });

  test('Accept a background color', () => {
    expect(rotate('42', 'ff00ff')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'rotate',
          fn: expect.any(Function),
          params: [42, {
            background: {
              r: 255, g: 0, b: 255, alpha: 1,
            },
          }],
        },
      ],
    }));
  });

  test('Accept a background color with alpha', () => {
    expect(rotate('42', 'ff00ff.9')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'rotate',
          fn: expect.any(Function),
          params: [42, {
            background: {
              r: 255, g: 0, b: 255, alpha: 0.9,
            },
          }],
        },
      ],
    }));
  });

  test('call rotate with the angle and a bg color', async () => {
    const { transformations: [{ fn }] } = rotate('-42', 'ff00ff.9');
    await fn(sharp);
    expect(sharp.rotate).toHaveBeenCalledTimes(1);
    expect(sharp.rotate).toHaveBeenCalledWith(-42, {
      background: {
        alpha: 0.9, r: 255, g: 0, b: 255,
      },
    });
  });

  test('throw if the angle is not a number', () => {
    expect(() => rotate('abc')).toThrow();
  });
});

