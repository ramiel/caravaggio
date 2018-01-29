const o = require('../../src/normalizers/o');

describe('Output', () => {
  test('original does not add an operation', () => {
    const result = o('original');
    expect(result).not.toHaveProperty('operations');
  });

  test('"jpg" is handled', () => {
    const result = o('jpg');
    expect(result).toEqual(expect.objectContaining({
      o: 'jpg',
      operations: [
        ['jpeg', []],
      ],
    }));
  });

  test('"jpeg" is handled', () => {
    const result = o('jpeg');
    expect(result).toEqual(expect.objectContaining({
      o: 'jpeg',
      operations: [
        ['jpeg', []],
      ],
    }));
  });

  test('"png" is handled', () => {
    const result = o('png');
    expect(result).toEqual(expect.objectContaining({
      o: 'png',
      operations: [
        ['png', []],
      ],
    }));
  });

  test('"webp" is handled', () => {
    const result = o('webp');
    expect(result).toEqual(expect.objectContaining({
      o: 'webp',
      operations: [
        ['webp', []],
      ],
    }));
  });

  test('"tiff" is handled', () => {
    const result = o('tiff');
    expect(result).toEqual(expect.objectContaining({
      o: 'tiff',
      operations: [
        ['tiff', []],
      ],
    }));
  });
});

