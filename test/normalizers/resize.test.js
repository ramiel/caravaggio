const resize = require('../../src/normalizers/resize');

describe('Resize', () => {
  test('width and heigth can be passed', () => {
    const result = resize('200x300');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: 'resize',
        params: [200, 300],
      }],
    });
  });

  test('only width can be passed', () => {
    const result = resize('200x');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: 'resize',
        params: [200, null],
      }],
    });
  });

  test('only height can be passed', () => {
    const result = resize('x300');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: 'resize',
        params: [null, 300],
      }],
    });
  });

  test('just a number is inended as width', () => {
    const result = resize('300');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: 'resize',
        params: [300, null],
      }],
    });
  });

  test('a non number return nothing (the opeartion will do nothing)', () => {
    const result = resize('abc');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: 'resize',
        params: [null, null],
      }],
    });
  });

  test('a wrong height will ignore it', () => {
    const result = resize('200xABCF');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: 'resize',
        params: [200, null],
      }],
    });
  });

  test('a wrong height and a missing "x" will ignore it', () => {
    const result = resize('200ABCF');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: 'resize',
        params: [200, null],
      }],
    });
  });

  test('return a function when trying to resie in percentage (width and height)', () => {
    const result = resize('0.8x0.9');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: expect.any(Function),
        params: [],
      }],
    });
  });

  test('return a function when trying to resie in percentage (width only)', () => {
    const result = resize('0.8x');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: expect.any(Function),
        params: [],
      }],
    });
  });

  test('return a function when trying to resie in percentage (height only)', () => {
    const result = resize('x0.8');
    expect(result).toEqual({
      transformations: [{
        name: 'resize',
        operation: expect.any(Function),
        params: [],
      }],
    });
  });
});

