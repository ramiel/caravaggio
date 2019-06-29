const extract = require('normalizers/extract');
const sharp = require('../mocks/sharp.mock');

describe('Extract', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('extract the desired sub image', () => {
    const operations = extract('95', '35', '100', '200');

    expect(operations).toEqual({
      transformations: [
        {
          name: 'extract',
          fn: expect.any(Function),
          params: [{
            left: 95, top: 35, width: 100, height: 200,
          }],
        },
      ],
    });
  });

  test('apply extraction', async () => {
    const { transformations: [{ fn }] } = extract('95', '35', '100', '200');
    await fn(sharp);
    expect(sharp.extract).toHaveBeenCalledTimes(1);
    expect(sharp.extract).toHaveBeenCalledWith({
      left: 95, top: 35, width: 100, height: 200,
    });
  });

  test('all parameters can be expressed as percentage', async () => {
    const operations = extract('0.1', '0.1', '0.5', '0.5');
    expect(operations).toEqual({
      transformations: [
        {
          name: 'extract',
          fn: expect.any(Function),
          params: [{
            left: 0.1, top: 0.1, width: 0.5, height: 0.5,
          }],
        },
      ],
    });
  });

  test('apply extraction with percentage', async () => {
    const { transformations: [{ fn }] } = extract('0.1', '0.1', '0.5', '0.5');
    await fn(sharp);
    expect(sharp.extract).toHaveBeenCalledTimes(1);
    expect(sharp.extract).toHaveBeenCalledWith({
      left: 64, top: 48, width: 320, height: 240,
    });
  });

  test('a missing parameter throws an error', () => {
    expect(() => extract('50', '50', '10')).toThrow();
  });

  test('a wrong format parameter throws an error', () => {
    expect(() => extract('50', '50', 'aba', '200')).toThrow();
  });
});
