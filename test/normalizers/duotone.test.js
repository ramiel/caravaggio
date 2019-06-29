const duotone = require('../../src/normalizers/duotone');
const sharp = require('../mocks/sharp.mock');
const pipeline = require('../mocks/pipeline.mock');

jest.mock('sharp', () => require('../mocks/sharp.mock').sharpConstructor); //eslint-disable-line


describe('Duotone', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('Accept two colors', () => {
    expect(duotone('FFAA00', '1122DC')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'duotone',
          fn: expect.any(Function),
          params: ['FFAA00', '1122DC'],
        },
      ],
    }));
  });

  test('Accept two colors and the opacity', () => {
    expect(duotone('FFAA00', '1122DC', '0.8')).toEqual(expect.objectContaining({
      transformations: [
        {
          name: 'duotone',
          fn: expect.any(Function),
          params: ['FFAA00', '1122DC', 0.8],
        },
      ],
    }));
  });

  test('apply duotone shift', async () => {
    pipeline.getOptions.mockReturnValueOnce({ o: 'png' });
    const { transformations: [{ fn }] } = duotone('FFAA00', '1122DC');
    await fn(sharp, pipeline);
    expect(sharp.toBuffer).toHaveBeenCalledTimes(1);
    expect(sharp.toFormat).toHaveBeenCalledTimes(1);
    expect(sharp.toFormat).toHaveBeenCalledWith('png');
  });

  test('apply duotone shift with opacity', async () => {
    pipeline.getOptions.mockReturnValueOnce({ o: 'png' });
    const { transformations: [{ fn }] } = duotone('FFAA00', '1122DC', '0.5');
    await fn(sharp, pipeline);
    expect(sharp.toBuffer).toHaveBeenCalledTimes(3);
  });

  test('use a format even if output is "original"', async () => {
    pipeline.getOptions.mockReturnValueOnce({ o: 'original' });
    sharp.metadata.mockResolvedValueOnce({ format: 'webp' });
    const { transformations: [{ fn }] } = duotone('FFAA00', '1122DC');
    await fn(sharp, pipeline);
    expect(sharp.toFormat).toHaveBeenCalledTimes(1);
    expect(sharp.toFormat).toHaveBeenCalledWith('webp');
  });

  test('throw if one of the colour is not valid', () => {
    expect(() => duotone('FFF000', 'hello')).toThrow();
  });

  test('throw if one of the colour is missing', () => {
    expect(() => duotone('FFF000')).toThrow();
  });
});

