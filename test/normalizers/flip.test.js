const flip = require('../../src/normalizers/flip');
const sharp = require('../mocks/sharp.mock');

describe('Flip', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('the default value is horizontal', () => {
    expect(flip()).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'flip',
          fn: expect.any(Function),
          params: [true],
        },
      ],
    }));
  });

  test('can flip horizontally', () => {
    expect(flip('x')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'flip',
          fn: expect.any(Function),
          params: [true],
        },
      ],
    }));
  });

  test('apply horizontal flip', async () => {
    const { transformations: [{ fn }] } = flip('x');
    await fn(sharp);
    expect(sharp.flop).toHaveBeenCalledTimes(1);
  });

  test('can flip vertically', () => {
    expect(flip('y')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'flip',
          fn: expect.any(Function),
          params: [true],
        },
      ],
    }));
  });

  test('apply vertical flip', async () => {
    const { transformations: [{ fn }] } = flip('y');
    await fn(sharp);
    expect(sharp.flip).toHaveBeenCalledTimes(1);
  });

  test('throw if an invalid value is passed', () => {
    expect(() => flip('h')).toThrow();
  });
});

