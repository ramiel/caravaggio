const sharp = require('mocks/sharp.mock');

const mockResize = jest.fn(async () => sharp);
const resize = require('normalizers/resize');

jest.mock('normalizers/resize/scale', () => () => mockResize);

describe('Resize', () => {
  const getResize = (...params) => resize(...params).transformations[0].fn;

  beforeEach(() => {
    sharp.mockClear();
    mockResize.mockClear();
  });

  test('mode must be available', async () => {
    expect(() => getResize('200x300', 'fantasycrop')).toThrowError();
  });

  test('mode scale is available', async () => {
    await expect(getResize('200x300', 'scale')(sharp)).resolves.toBeDefined();
  });

  test('mode fit is available', async () => {
    await expect(getResize('200x300', 'fit')(sharp)).resolves.toBeDefined();
  });

  test('mode downfit is available', async () => {
    await expect(getResize('200x300', 'downfit')(sharp)).resolves.toBeDefined();
  });

  test('mode upfit is available', async () => {
    await expect(getResize('200x300', 'upfit')(sharp)).resolves.toBeDefined();
  });

  test('mode fill is available', async () => {
    await expect(getResize('200x300', 'fill')(sharp)).resolves.toBeDefined();
  });

  test('mode downfill is available', async () => {
    await expect(getResize('200x300', 'downfill')(sharp)).resolves.toBeDefined();
  });

  test('mode embed is available', async () => {
    await expect(getResize('200x300', 'embed')(sharp)).resolves.toBeDefined();
  });

  test('width and heigth can be passed', async () => {
    await (getResize('200x300')(sharp));
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith(200, 300);
  });

  test('only width can be passed', async () => {
    await (getResize('200x')(sharp));
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith(200, null);
  });

  test('only width can be passed and the aspect ratio can be ignored', async () => {
    await (getResize('200x', 'scale', 'iar')(sharp));
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith(200, null, 'iar');
  });

  test('only height can be passed', async () => {
    await (getResize('x300')(sharp));
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith(null, 300);
  });

  test('just a number is intended as width', async () => {
    await (getResize('200')(sharp));
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith(200, null);
  });

  test('a non number throws an error', async () => {
    expect(() => getResize('abc')).toThrowError();
  });

  test('a wrong height will throw', async () => {
    expect(() => getResize('200xabc')).toThrowError();
  });

  test('a wrong height and a missing "x" will throw', async () => {
    expect(() => getResize('200abc')).toThrowError();
  });

  test('the percentage is calculated', async () => {
    const { width, height } = await sharp.metadata();
    await (getResize('0.8x0.9')(sharp));
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith(width * 0.8, height * 0.9);
  });
});
