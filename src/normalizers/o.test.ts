/* eslint-env jest */

import sharp from '../tests/mocks/sharp.mock';
import o from './o';
import { ServerRequest } from 'microrouter';

const req = {} as ServerRequest;

describe('Output', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('original does not add an operation', () => {
    const result = o({ operation: 'o', value: 'original' });
    expect(result).toHaveLength(0);
  });

  test('throws if the format is not supported', () => {
    expect(() => o({ operation: 'o', value: 'exotic' })).toThrow();
  });

  test('"jpg" is handled', () => {
    const result = o({ operation: 'o', value: 'jpg' });
    expect(result).toEqual(
      expect.objectContaining([
        {
          name: 'o',
          op: expect.any(Function),
          params: ['jpg'],
        },
      ])
    );
  });

  test('"jpeg" is handled', () => {
    const result = o({ operation: 'o', value: 'jpeg' });
    expect(result).toEqual([
      {
        name: 'o',
        op: expect.any(Function),
        params: ['jpeg'],
      },
    ]);
  });

  test('output to jpeg', async () => {
    const [{ op }] = o({ operation: 'o', value: 'jpeg' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.jpeg).toHaveBeenCalledTimes(1);
  });

  test('"png" is handled', () => {
    const result = o({ operation: 'o', value: 'png' });
    expect(result).toEqual(
      expect.objectContaining([
        {
          name: 'o',
          op: expect.any(Function),
          params: ['png'],
        },
      ])
    );
  });

  test('output to png', async () => {
    const [{ op }] = o({ operation: 'o', value: 'png' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.png).toHaveBeenCalledTimes(1);
  });

  test('"webp" is handled', () => {
    const result = o({ operation: 'o', value: 'webp' });
    expect(result).toEqual(
      expect.objectContaining([
        {
          name: 'o',
          op: expect.any(Function),
          params: ['webp'],
        },
      ])
    );
  });

  test('output to webp', async () => {
    const [{ op }] = o({ operation: 'o', value: 'webp' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.webp).toHaveBeenCalledTimes(1);
  });

  test('"tiff" is handled', () => {
    const result = o({ operation: 'o', value: 'tiff' });
    expect(result).toEqual(
      expect.objectContaining([
        {
          name: 'o',
          op: expect.any(Function),
          params: ['tiff'],
        },
      ])
    );
  });

  test('output to tiff', async () => {
    const [{ op }] = o({ operation: 'o', value: 'tiff' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.tiff).toHaveBeenCalledTimes(1);
  });
});
