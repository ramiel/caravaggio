const overlayModule = require('normalizers/overlay');
const sharp = require('../mocks/sharp.mock');

const mockImageGet = jest.fn(async () => Buffer.from('an image buffer'));
jest.mock('image', () => (/* config */) => ({
  get: mockImageGet,
}));

const overlay = overlayModule({});

describe('Overlay', () => {
  beforeEach(() => {
    mockImageGet.mockClear();
    sharp.mockClear();
  });

  test('overlay the desired image', async () => {
    const operations = overlay('https://imageUrl');
    expect(operations).toEqual({
      transformations: [
        {
          name: 'overlay',
          fn: expect.any(Function),
          params: ['https://imageUrl'],
        },
      ],
    });
  });

  test('the image is retrieved', async () => {
    const { transformations: [{ fn }] } = overlay('https://imageUrl');
    await fn(sharp);
    expect(mockImageGet).toHaveBeenCalledTimes(1);
    expect(mockImageGet).toHaveBeenCalledWith('https://imageUrl');
    expect(sharp.overlayWith).toHaveBeenCalledTimes(1);
    expect(sharp.overlayWith).toHaveBeenCalledWith(
      expect.any(Buffer),
      { tile: false },
    );
  });

  test('a gravity can be set', () => {
    const operations = overlay('https://imageUrl', 'gse');
    expect(operations).toEqual({
      transformations: [
        {
          name: 'overlay',
          fn: expect.any(Function),
          params: ['https://imageUrl', 'gse'],
        },
      ],
    });
  });

  test('overlay with gravity applied', async () => {
    const { transformations: [{ fn }] } = overlay('https://imageUrl', 'gse');
    await fn(sharp);
    expect(sharp.overlayWith).toHaveBeenCalledTimes(1);
    expect(sharp.overlayWith).toHaveBeenCalledWith(
      expect.any(Buffer),
      { gravity: 'southeast', tile: false },
    );
  });

  test('x and y can be set', async () => {
    const operations = overlay('https://imageUrl', 'x10', 'y20');
    expect(operations).toEqual({
      transformations: [
        {
          name: 'overlay',
          fn: expect.any(Function),
          params: ['https://imageUrl', 'x10', 'y20'],
        },
      ],
    });
  });

  test('overlay with x and y applied', async () => {
    const { transformations: [{ fn }] } = overlay('https://imageUrl', 'x10', 'y20');
    await fn(sharp);
    expect(sharp.overlayWith).toHaveBeenCalledTimes(1);
    expect(sharp.overlayWith).toHaveBeenCalledWith(
      expect.any(Buffer),
      { left: 10, top: 20, tile: false },
    );
  });

  test('x and y can be set as percentage', async () => {
    const operations = overlay('https://imageUrl', 'x0.1', 'y0.2');
    expect(operations).toEqual({
      transformations: [
        {
          name: 'overlay',
          fn: expect.any(Function),
          params: ['https://imageUrl', 'x0.1', 'y0.2'],
        },
      ],
    });
  });

  test('overlay with x and y as percentage applied', async () => {
    const { transformations: [{ fn }] } = overlay('https://imageUrl', 'x0.1', 'y0.2');
    await fn(sharp);
    expect(sharp.overlayWith).toHaveBeenCalledTimes(1);
    expect(sharp.overlayWith).toHaveBeenCalledWith(
      expect.any(Buffer),
      { left: 64, top: 96, tile: false },
    );
  });

  test('only x can be set. y will be 0', async () => {
    const operations = overlay('https://imageUrl', 'x10');
    expect(operations).toEqual({
      transformations: [
        {
          name: 'overlay',
          fn: expect.any(Function),
          params: ['https://imageUrl', 'x10'],
        },
      ],
    });
  });

  test('overlay with x  applied', async () => {
    const { transformations: [{ fn }] } = overlay('https://imageUrl', 'x10');
    await fn(sharp);
    expect(sharp.overlayWith).toHaveBeenCalledTimes(1);
    expect(sharp.overlayWith).toHaveBeenCalledWith(
      expect.any(Buffer),
      { left: 10, top: 0, tile: false },
    );
  });

  test('only y can be set. x will be 0', async () => {
    const operations = overlay('https://imageUrl', 'y40');
    expect(operations).toEqual({
      transformations: [
        {
          name: 'overlay',
          fn: expect.any(Function),
          params: ['https://imageUrl', 'y40'],
        },
      ],
    });
  });

  test('overlay with y  applied', async () => {
    const { transformations: [{ fn }] } = overlay('https://imageUrl', 'y40');
    await fn(sharp);
    expect(sharp.overlayWith).toHaveBeenCalledTimes(1);
    expect(sharp.overlayWith).toHaveBeenCalledWith(
      expect.any(Buffer),
      { left: 0, top: 40, tile: false },
    );
  });

  test('watermark can be set', async () => {
    const operations = overlay('https://imageUrl', 'watermark');
    expect(operations).toEqual({
      transformations: [
        {
          name: 'overlay',
          fn: expect.any(Function),
          params: ['https://imageUrl', 'watermark'],
        },
      ],
    });
  });

  test('overlay with watermark applied', async () => {
    const { transformations: [{ fn }] } = overlay('https://imageUrl', 'watermark');
    await fn(sharp);
    expect(sharp.overlayWith).toHaveBeenCalledTimes(1);
    expect(sharp.overlayWith).toHaveBeenCalledWith(
      expect.any(Buffer),
      { tile: true },
    );
  });

  test('if the image is not retrieved, an error is returned', async () => {
    mockImageGet.mockImplementationOnce(async () => { throw new Error(); });
    const { transformations: [{ fn }] } = overlay('https://imageUrl', 'watermark');
    await expect(fn()).rejects.toBeInstanceOf(Error);
  });
});
