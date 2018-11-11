const overlayModule = require('normalizers/overlay');
const { createPipeline } = require('mocks/pipeline');

const mockImageGet = jest.fn(async () => Buffer.from('an image buffer'));
jest.mock('image', () => (/* config */) => ({
  get: mockImageGet,
}));

const overlay = overlayModule({});
const pip = createPipeline('http://any.com/little.jpeg');
pip.setMetadata({ width: 640, height: 480 });

describe('Overlay', () => {
  beforeEach(() => {
    mockImageGet.mockClear();
  });

  test('overlay the desired image', async () => {
    const overlayGenerator = overlay('https://imageUrl').transformations[0].operation;
    const operations = await overlayGenerator(pip);
    expect(operations).toEqual([
      {
        name: 'overlay',
        operation: 'overlayWith',
        params: [
          expect.any(Buffer),
          {
            gravity: undefined,
            tile: false,
          },
        ],
      },
    ]);
  });

  test('the image is retrieved', async () => {
    const overlayGenerator = overlay('https://imageUrl').transformations[0].operation;
    await overlayGenerator(pip);
    expect(mockImageGet).toHaveBeenCalledTimes(1);
    expect(mockImageGet).toHaveBeenCalledWith('https://imageUrl');
  });

  test('a gravity can be set', async () => {
    const overlayGenerator = overlay('https://imageUrl', 'gse').transformations[0].operation;
    const operations = await overlayGenerator(pip);
    expect(operations).toEqual([
      {
        name: 'overlay',
        operation: 'overlayWith',
        params: [
          expect.any(Buffer),
          {
            gravity: 'southeast',
            tile: false,
          },
        ],
      },
    ]);
  });

  test('x and y can be set', async () => {
    const overlayGenerator = overlay('https://imageUrl', 'x10', 'y20').transformations[0].operation;
    const operations = await overlayGenerator(pip);
    expect(operations).toEqual([
      {
        name: 'overlay',
        operation: 'overlayWith',
        params: [
          expect.any(Buffer),
          {
            left: 10,
            top: 20,
            tile: false,
          },
        ],
      },
    ]);
  });

  test('x and y can be set as percentage', async () => {
    const overlayGenerator = overlay('https://imageUrl', 'x0.1', 'y0.2').transformations[0].operation;
    const operations = await overlayGenerator(pip);
    expect(operations).toEqual([
      {
        name: 'overlay',
        operation: 'overlayWith',
        params: [
          expect.any(Buffer),
          {
            left: 64,
            top: 96,
            tile: false,
          },
        ],
      },
    ]);
  });

  test('only x can be set. y will be 0', async () => {
    const overlayGenerator = overlay('https://imageUrl', 'x10').transformations[0].operation;
    const operations = await overlayGenerator(pip);
    expect(operations).toEqual([
      {
        name: 'overlay',
        operation: 'overlayWith',
        params: [
          expect.any(Buffer),
          {
            left: 10,
            top: 0,
            tile: false,
          },
        ],
      },
    ]);
  });

  test('only y can be set. x will be 0', async () => {
    const overlayGenerator = overlay('https://imageUrl', 'y40').transformations[0].operation;
    const operations = await overlayGenerator(pip);
    expect(operations).toEqual([
      {
        name: 'overlay',
        operation: 'overlayWith',
        params: [
          expect.any(Buffer),
          {
            left: 0,
            top: 40,
            tile: false,
          },
        ],
      },
    ]);
  });

  test('watermark can be set', async () => {
    const overlayGenerator = overlay('https://imageUrl', 'watermark').transformations[0].operation;
    const operations = await overlayGenerator(pip);
    expect(operations).toEqual([
      {
        name: 'overlay',
        operation: 'overlayWith',
        params: [
          expect.any(Buffer),
          {
            tile: true,
          },
        ],
      },
    ]);
  });

  test('if the image is not retrieved, an error is returned', async () => {
    mockImageGet.mockImplementationOnce(async () => { throw new Error(); });
    const overlayGenerator = overlay('https://imageUrl').transformations[0].operation;
    await expect(overlayGenerator(pip)).rejects.toBeInstanceOf(Error);
  });
});
