/* eslint-env jest */

import { ServerRequest } from 'microrouter';
import { Logger } from 'pino';
import { Config } from '../config/default';
import pluginLoader from '../pluginLoader/pluginLoader';
import sharp from '../tests/mocks/sharp.mock';
import overlayCreator from './overlay';

const mockImageGet = jest.fn(async () => Buffer.from('an image buffer'));
jest.mock('../basePlugins/webImageLoader', () => () => (/* config */) => ({
  inputImageLoader: mockImageGet,
}));
const config = {} as Config;
const logger = {} as Logger;
const req = {} as ServerRequest;

const overlay = overlayCreator({
  config,
  logger,
  pluginManager: pluginLoader(config, logger),
});

describe('Overlay', () => {
  beforeEach(() => {
    mockImageGet.mockClear();
    sharp.mockClear();
  });

  test('overlay the desired image', async () => {
    const operations = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
    });
    expect(operations).toEqual([
      {
        name: 'overlay',
        op: expect.any(Function),
        params: [
          expect.objectContaining({
            url: 'https://imageUrl',
          }),
        ],
      },
    ]);
  });

  test('the image is retrieved', async () => {
    const [{ op }] = overlay({ operation: 'overlay', url: 'https://imageUrl' });
    await op({ image: sharp, otherOps: [], req });
    expect(mockImageGet).toHaveBeenCalledTimes(1);
    expect(mockImageGet).toHaveBeenCalledWith('https://imageUrl');
    expect(sharp.composite).toHaveBeenCalledTimes(1);
    expect(sharp.composite).toHaveBeenCalledWith([
      {
        input: expect.any(Buffer),
        tile: false,
      },
    ]);
  });

  test('a gravity can be set', () => {
    const operations = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      g: 'se',
    });
    expect(operations).toEqual([
      {
        name: 'overlay',
        op: expect.any(Function),
        params: [
          expect.objectContaining({
            url: 'https://imageUrl',
            g: 'southeast',
          }),
        ],
      },
    ]);
  });

  test('overlay with gravity applied', async () => {
    const [{ op }] = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      g: 'se',
    });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.composite).toHaveBeenCalledTimes(1);
    expect(sharp.composite).toHaveBeenCalledWith([
      {
        input: expect.any(Buffer),
        gravity: 'southeast',
        tile: false,
      },
    ]);
  });

  test('x and y can be set', async () => {
    const operations = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      x: '10',
      y: '20',
    });
    expect(operations).toEqual([
      {
        name: 'overlay',
        op: expect.any(Function),
        params: [
          expect.objectContaining({
            url: 'https://imageUrl',
            x: 10,
            y: 20,
          }),
        ],
      },
    ]);
  });

  test('overlay with x and y applied', async () => {
    const [{ op }] = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      x: '10',
      y: '20',
    });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.composite).toHaveBeenCalledTimes(1);
    expect(sharp.composite).toHaveBeenCalledWith([
      {
        input: expect.any(Buffer),
        left: 10,
        top: 20,
        tile: false,
      },
    ]);
  });

  test('x and y can be set as percentage', async () => {
    const operations = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      x: '0.1',
      y: '0.2',
    });
    expect(operations).toEqual([
      {
        name: 'overlay',
        op: expect.any(Function),
        params: [
          expect.objectContaining({
            url: 'https://imageUrl',
            x: 0.1,
            y: 0.2,
          }),
        ],
      },
    ]);
  });

  test('overlay with x and y as percentage applied', async () => {
    const [{ op }] = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      x: '0.1',
      y: '0.2',
    });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.composite).toHaveBeenCalledTimes(1);
    expect(sharp.composite).toHaveBeenCalledWith([
      {
        input: expect.any(Buffer),
        left: 64,
        top: 96,
        tile: false,
      },
    ]);
  });

  test('only x can be set. y will be 0', async () => {
    const operations = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      x: '10',
    });
    expect(operations).toEqual([
      {
        name: 'overlay',
        op: expect.any(Function),
        params: [
          expect.objectContaining({
            url: 'https://imageUrl',
            x: 10,
          }),
        ],
      },
    ]);
  });

  test('overlay with x  applied', async () => {
    const [{ op }] = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      x: '10',
    });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.composite).toHaveBeenCalledTimes(1);
    expect(sharp.composite).toHaveBeenCalledWith([
      {
        input: expect.any(Buffer),
        left: 10,
        top: 0,
        tile: false,
      },
    ]);
  });

  test('only y can be set. x will be 0', async () => {
    const operations = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      y: '40',
    });
    expect(operations).toEqual([
      {
        name: 'overlay',
        op: expect.any(Function),
        params: [
          expect.objectContaining({
            url: 'https://imageUrl',
            y: 40,
          }),
        ],
      },
    ]);
  });

  test('overlay with y  applied', async () => {
    const [{ op }] = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      y: '40',
    });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.composite).toHaveBeenCalledTimes(1);
    expect(sharp.composite).toHaveBeenCalledWith([
      {
        input: expect.any(Buffer),
        left: 0,
        top: 40,
        tile: false,
      },
    ]);
  });

  test('watermark can be set', async () => {
    const operations = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      watermark: 'true',
    });
    expect(operations).toEqual([
      {
        name: 'overlay',
        op: expect.any(Function),
        params: [
          expect.objectContaining({
            url: 'https://imageUrl',
            watermark: true,
          }),
        ],
      },
    ]);
  });

  test('overlay with watermark applied', async () => {
    const [{ op }] = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      watermark: 'true',
    });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.composite).toHaveBeenCalledTimes(1);
    expect(sharp.composite).toHaveBeenCalledWith([
      {
        input: expect.any(Buffer),
        tile: true,
      },
    ]);
  });

  test('if the image is not retrieved, an error is returned', async () => {
    mockImageGet.mockImplementationOnce(async () => {
      throw new Error();
    });
    const [{ op }] = overlay({
      operation: 'overlay',
      url: 'https://imageUrl',
      watermark: 'true',
    });
    await expect(
      op({ image: sharp, otherOps: [], req }),
    ).rejects.toBeInstanceOf(Error);
  });
});
