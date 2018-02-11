const flip = require('../../src/normalizers/flip');

describe('Flip', () => {
  test('the default value is horizontal', () => {
    expect(flip()).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'flip',
          operation: 'flop',
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
          operation: 'flop',
          params: [true],
        },
      ],
    }));
  });

  test('can flip vertically', () => {
    expect(flip('y')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'flip',
          operation: 'flip',
          params: [true],
        },
      ],
    }));
  });

  test('throw if an invalid value is passed', () => {
    expect(() => flip('h')).toThrow('Accepted values are "x" and "y"');
  });
});

