import resize, { ResizeRawOp } from './index';
import sharp from '../../tests/mocks/sharp.mock';
import { ServerRequest } from 'microrouter';

const mockResize = jest.fn(async () => sharp);
jest.mock('./scale', () => () => mockResize);
const req = {} as ServerRequest;

describe('Resize', () => {
  const getResize = (rawOp: ResizeRawOp) => resize(rawOp)[0].op;

  beforeEach(() => {
    sharp.mockClear();
    mockResize.mockClear();
  });

  test('mode must be available', async () => {
    expect(() =>
      getResize({ operation: 'resize', s: '200x300', m: 'fantasycrop' })
    ).toThrow();
  });

  test('mode scale is available', async () => {
    await expect(
      getResize({ operation: 'resize', s: '200x300', m: 'scale' })({
        image: sharp,
        otherOps: [],
        req,
      })
    ).resolves.toBeDefined();
  });

  test('mode fit is available', async () => {
    await expect(
      getResize({ operation: 'resize', s: '200x300', m: 'fit' })({
        image: sharp,
        otherOps: [],
        req,
      })
    ).resolves.toBeDefined();
  });

  test('mode downfit is available', async () => {
    await expect(
      getResize({ operation: 'resize', s: '200x300', m: 'downfit' })({
        image: sharp,
        otherOps: [],
        req,
      })
    ).resolves.toBeDefined();
  });

  test('mode upfit is available', async () => {
    await expect(
      getResize({ operation: 'resize', s: '200x300', m: 'upfit' })({
        image: sharp,
        otherOps: [],
        req,
      })
    ).resolves.toBeDefined();
  });

  test('mode fill is available', async () => {
    await expect(
      getResize({ operation: 'resize', s: '200x300', m: 'fill' })({
        image: sharp,
        otherOps: [],
        req,
      })
    ).resolves.toBeDefined();
  });

  test('mode downfill is available', async () => {
    await expect(
      getResize({ operation: 'resize', s: '200x300', m: 'downfill' })({
        image: sharp,
        otherOps: [],
        req,
      })
    ).resolves.toBeDefined();
  });

  test('mode embed is available', async () => {
    await expect(
      getResize({ operation: 'resize', s: '200x300', m: 'embed' })({
        image: sharp,
        otherOps: [],
        req,
      })
    ).resolves.toBeDefined();
  });

  test('width and heigth can be passed', async () => {
    await getResize({ operation: 'resize', s: '200x300' })({
      image: sharp,
      otherOps: [],
      req,
    });
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith({
      height: 300,
      width: 200,
      iar: false,
    });
  });

  test('only width can be passed', async () => {
    await getResize({ operation: 'resize', s: '200x' })({
      image: sharp,
      otherOps: [],
      req,
    });
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith({
      width: 200,
      height: null,
      iar: false,
    });
  });

  test('only width can be passed and the aspect ratio can be ignored', async () => {
    await getResize({
      operation: 'resize',
      s: '200x',
      m: 'scale',
      iar: 'true',
    })({
      image: sharp,
      otherOps: [],
      req,
    });
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith({
      width: 200,
      height: null,
      iar: true,
    });
  });

  test('only height can be passed', async () => {
    await getResize({ operation: 'resize', s: 'x300' })({
      image: sharp,
      otherOps: [],
      req,
    });
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith({
      width: null,
      height: 300,
      iar: false,
    });
  });

  test('just a number is intended as width', async () => {
    await getResize({ operation: 'resize', s: '200' })({
      image: sharp,
      otherOps: [],
      req,
    });
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith({
      width: 200,
      height: null,
      iar: false,
    });
  });

  test('a non number throws an error', async () => {
    expect(() => getResize({ operation: 'resize', s: 'abc' })).toThrow();
  });

  test('a wrong height will throw', async () => {
    expect(() => getResize({ operation: 'resize', s: '200xabc' })).toThrow();
  });

  test('a wrong height and a missing "x" will throw', async () => {
    expect(() => getResize({ operation: 'resize', s: '200abc' })).toThrow();
  });

  test('the percentage is calculated', async () => {
    const { width, height } = await sharp.metadata();
    await getResize({ operation: 'resize', s: '0.8x0.9' })({
      image: sharp,
      otherOps: [],
      req,
    });
    expect(mockResize).toHaveBeenCalledTimes(1);
    expect(mockResize).toHaveBeenCalledWith({
      width: width * 0.8,
      height: height * 0.9,
      iar: false,
    });
  });
});
