/* eslint-env jest */

import { ServerRequest } from 'microrouter';
import sharp from '../tests/mocks/sharp.mock';
import progressive from './progressive';

const req = {} as ServerRequest;

describe('Progressive', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('prgressive is a function', () => {
    expect(progressive).toBeInstanceOf(Function);
  });

  test('progressive throw if the value is not a boolean', () => {
    expect(() =>
      progressive({ operation: 'progressive', value: 'hello' }),
    ).toThrow();
  });

  test('progressive does throw if the value is missing', () => {
    expect(() =>
      progressive({ operation: 'progressive', value: '' }),
    ).toThrow();
  });

  test('progressive returns a function as operation', () => {
    expect(progressive({ operation: 'progressive', value: 'true' })).toEqual(
      expect.objectContaining([
        {
          name: 'progressive',
          op: expect.any(Function),
          params: [true],
        },
      ]),
    );
  });

  describe('Given an output has been specified', () => {
    test('force to false if progressive is false', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'false',
      });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['jpeg'] },
        ],
        req,
      });
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: false });
    });

    test('add progressive if the output is jpeg', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'true',
      });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['jpeg'] },
        ],
        req,
      });
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: true });
    });

    test('add progressive if the output is jpg', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'true',
      });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['jpg'] },
        ],
        req,
      });
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: true });
    });

    test('add nothing if the output is webp', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'true',
      });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['webp'] },
        ],
        req,
      });
      expect(sharp.webp).not.toHaveBeenCalled();
    });

    test('add nothing if the output is tiff', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'true',
      });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['tiff'] },
        ],
        req,
      });
      expect(sharp.tiff).not.toHaveBeenCalled();
    });

    test('add progressive in case the output is png', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'true',
      });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['png'] },
        ],
        req,
      });
      expect(sharp.png).toHaveBeenCalledTimes(1);
      expect(sharp.png).toHaveBeenCalledWith({ progressive: true });
    });
  });

  describe('Given the output as "original"', () => {
    test('force to false if progressive is false', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'false',
      });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['original'] },
        ],
        req,
      });
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: false });
    });

    test('add progressive if the output is jpeg', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'true',
      });
      sharp.metadata.mockResolvedValueOnce({ format: 'jpeg' });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['original'] },
        ],
        req,
      });
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: true });
    });

    test('add nothing if the output is webp', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'true',
      });
      sharp.metadata.mockResolvedValueOnce({ format: 'webp' });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['original'] },
        ],
        req,
      });
      expect(sharp.webp).not.toHaveBeenCalled();
    });

    test('add nothing if the output is tiff', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'true',
      });
      sharp.metadata.mockResolvedValueOnce({ format: 'tiff' });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['original'] },
        ],
        req,
      });
      expect(sharp.tiff).not.toHaveBeenCalled();
    });

    test('add progressive if the output is png', async () => {
      const [{ op }] = progressive({
        operation: 'progressive',
        value: 'true',
      });
      sharp.metadata.mockResolvedValueOnce({ format: 'png' });
      await op({
        image: sharp,
        otherOps: [
          { name: 'o', op: async ({ image }) => image, params: ['original'] },
        ],
        req,
      });
      expect(sharp.png).toHaveBeenCalledTimes(1);
      expect(sharp.png).toHaveBeenCalledWith({ progressive: true });
    });
  });
});
