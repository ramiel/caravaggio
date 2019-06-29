const o = require('../../src/normalizers/o');
const sharp = require('../mocks/sharp.mock');

describe('Output', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('original does not add an operation', () => {
    const result = o('original');
    expect(result).not.toHaveProperty('output');
  });

  test('throws if the format is not supported', () => {
    expect(() => o('exotic')).toThrow();
  });

  test('"jpg" is handled', () => {
    const result = o('jpg');
    expect(result).toEqual(expect.objectContaining({
      o: 'jpg',
      output: [
        {
          name: 'o',
          fn: expect.any(Function),
          params: ['jpg'],
        },
      ],
    }));
  });

  test('"jpeg" is handled', () => {
    const result = o('jpeg');
    expect(result).toEqual(expect.objectContaining({
      o: 'jpeg',
      output: [
        {
          name: 'o',
          fn: expect.any(Function),
          params: ['jpeg'],
        },
      ],
    }));
  });

  test('output to jpeg', async () => {
    const { output: [{ fn }] } = o('jpeg');
    await fn(sharp);
    expect(sharp.jpeg).toHaveBeenCalledTimes(1);
  });

  test('"png" is handled', () => {
    const result = o('png');
    expect(result).toEqual(expect.objectContaining({
      o: 'png',
      output: [
        {
          name: 'o',
          fn: expect.any(Function),
          params: ['png'],
        },
      ],
    }));
  });

  test('output to png', async () => {
    const { output: [{ fn }] } = o('png');
    await fn(sharp);
    expect(sharp.png).toHaveBeenCalledTimes(1);
  });

  test('"webp" is handled', () => {
    const result = o('webp');
    expect(result).toEqual(expect.objectContaining({
      o: 'webp',
      output: [
        {
          name: 'o',
          fn: expect.any(Function),
          params: ['webp'],
        },
      ],
    }));
  });

  test('output to webp', async () => {
    const { output: [{ fn }] } = o('webp');
    await fn(sharp);
    expect(sharp.webp).toHaveBeenCalledTimes(1);
  });

  test('"tiff" is handled', () => {
    const result = o('tiff');
    expect(result).toEqual(expect.objectContaining({
      o: 'tiff',
      output: [
        {
          name: 'o',
          fn: expect.any(Function),
          params: ['tiff'],
        },
      ],
    }));
  });

  test('output to tiff', async () => {
    const { output: [{ fn }] } = o('tiff');
    await fn(sharp);
    expect(sharp.tiff).toHaveBeenCalledTimes(1);
  });
});

