/* eslint-env jest */
import rotate from './rotate';
import sharp from '../tests/mocks/sharp.mock';
import { ServerRequest } from 'microrouter';

const req = {} as ServerRequest;

describe('Rotate', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('Accept multiple of 90°', () => {
    expect(rotate({ operation: 'rotate', v: '180' })).toEqual(
      expect.objectContaining([
        {
          name: 'rotate',
          op: expect.any(Function),
          params: [180, {}],
        },
      ])
    );
  });

  test('Accept negative multiple of 90°', () => {
    expect(rotate({ operation: 'rotate', v: '-180' })).toEqual(
      expect.objectContaining([
        {
          name: 'rotate',
          op: expect.any(Function),
          params: [-180, {}],
        },
      ])
    );
  });

  test('Accept multiple of 90° beyond 360°', () => {
    expect(rotate({ operation: 'rotate', v: '450' })).toEqual(
      expect.objectContaining([
        {
          name: 'rotate',
          op: expect.any(Function),
          params: [450, {}],
        },
      ])
    );
  });

  test('Accept a custom angle', () => {
    expect(rotate({ operation: 'rotate', v: '42' })).toEqual(
      expect.objectContaining([
        {
          name: 'rotate',
          op: expect.any(Function),
          params: [42, {}],
        },
      ])
    );
  });

  test('call rotate with the angle', async () => {
    const [{ op }] = rotate({ operation: 'rotate', v: '42' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.rotate).toHaveBeenCalledTimes(1);
    expect(sharp.rotate).toHaveBeenCalledWith(42, {});
  });

  test('Accept a background color', () => {
    expect(rotate({ operation: 'rotate', v: '42', b: 'ff00ff' })).toEqual(
      expect.objectContaining([
        {
          name: 'rotate',
          op: expect.any(Function),
          params: [
            42,
            {
              background: {
                alpha: 1,
                r: 255,
                g: 0,
                b: 255,
              },
            },
          ],
        },
      ])
    );
  });

  test('Accept a background color with alpha', () => {
    expect(rotate({ operation: 'rotate', v: '42', b: 'ff00ff.9' })).toEqual(
      expect.objectContaining([
        {
          name: 'rotate',
          op: expect.any(Function),
          params: [
            42,
            {
              background: {
                r: 255,
                g: 0,
                b: 255,
                alpha: 0.9,
              },
            },
          ],
        },
      ])
    );
  });

  test('call rotate with the angle and a bg color', async () => {
    const [{ op }] = rotate({ operation: 'rotate', v: '-42', b: 'ff00ff.9' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.rotate).toHaveBeenCalledTimes(1);
    expect(sharp.rotate).toHaveBeenCalledWith(-42, {
      background: {
        alpha: 0.9,
        r: 255,
        g: 0,
        b: 255,
      },
    });
  });

  test('throw if the angle is not a number', () => {
    expect(() => rotate({ operation: 'rotate', v: 'abc' })).toThrow();
  });
});
