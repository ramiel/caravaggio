import { ServerRequest } from 'microrouter';
import sharp from '../tests/mocks/sharp.mock';
/* eslint-env jest */
import q from './q';

const req = {} as ServerRequest;
const normalizeQ = (quality: number) => (quality * 80) / 100;

describe('Quality', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('q is a function', () => {
    expect(q).toBeInstanceOf(Function);
  });

  test('q returns a function as operation', () => {
    expect(q({ operation: 'q', value: '90' })).toEqual([
      {
        name: 'q',
        op: expect.any(Function),
        params: [90],
      },
    ]);
  });

  test('round the quality', async () => {
    const [{ op }] = q({ operation: 'q', value: '47' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.jpeg).toHaveBeenCalledTimes(1);
    expect(sharp.jpeg).toHaveBeenCalledWith({ quality: 38 });
  });

  describe('Evaluate quality', () => {
    const passedQuality = 90;
    const [{ op }] = q({ operation: 'q', value: `${passedQuality}` });

    describe('Given an output has been specified', () => {
      test('add quality if the output is jpeg', async () => {
        await op({ image: sharp, otherOps: [], req });
        expect(sharp.jpeg).toHaveBeenCalledTimes(1);
        expect(sharp.jpeg).toHaveBeenCalledWith({
          quality: normalizeQ(passedQuality),
        });
      });

      test('add quality if the output is jpg', async () => {
        await op({
          image: sharp,
          otherOps: [
            { name: 'o', op: async ({ image }) => image, params: ['jpeg'] },
          ],
          req,
        });
        expect(sharp.jpeg).toHaveBeenCalledTimes(1);
        expect(sharp.jpeg).toHaveBeenCalledWith({
          quality: normalizeQ(passedQuality),
        });
      });

      test('add quality if the output is webp', async () => {
        await op({
          image: sharp,
          otherOps: [
            { name: 'o', op: async ({ image }) => image, params: ['webp'] },
          ],
          req,
        });
        expect(sharp.webp).toHaveBeenCalledTimes(1);
        expect(sharp.webp).toHaveBeenCalledWith({
          quality: normalizeQ(passedQuality),
        });
      });

      test('add quality if the output is tiff', async () => {
        await op({
          image: sharp,
          otherOps: [
            { name: 'o', op: async ({ image }) => image, params: ['tiff'] },
          ],
          req,
        });
        expect(sharp.tiff).toHaveBeenCalledTimes(1);
        expect(sharp.tiff).toHaveBeenCalledWith({
          quality: normalizeQ(passedQuality),
        });
      });

      test('does nothing in case the output is png', async () => {
        await op({
          image: sharp,
          otherOps: [
            { name: 'o', op: async ({ image }) => image, params: ['png'] },
          ],
          req,
        });
        expect(sharp.png).not.toHaveBeenCalled();
      });
    });

    describe('Given the output as "original"', () => {
      test('add quality if the output is jpeg', async () => {
        await op({
          image: sharp,
          otherOps: [
            { name: 'o', op: async ({ image }) => image, params: ['original'] },
          ],
          req,
        });
        expect(sharp.jpeg).toHaveBeenCalledTimes(1);
        expect(sharp.jpeg).toHaveBeenCalledWith({
          quality: normalizeQ(passedQuality),
        });
      });

      test('add quality if the output is webp', async () => {
        sharp.metadata.mockResolvedValueOnce({ format: 'webp' });
        await op({
          image: sharp,
          otherOps: [
            { name: 'o', op: async ({ image }) => image, params: ['original'] },
          ],
          req,
        });
        expect(sharp.webp).toHaveBeenCalledTimes(1);
        expect(sharp.webp).toHaveBeenCalledWith({
          quality: normalizeQ(passedQuality),
        });
      });

      test('add quality if the output is tiff', async () => {
        sharp.metadata.mockResolvedValueOnce({ format: 'tiff' });
        await op({
          image: sharp,
          otherOps: [
            { name: 'o', op: async ({ image }) => image, params: ['original'] },
          ],
          req,
        });
        expect(sharp.tiff).toHaveBeenCalledTimes(1);
        expect(sharp.tiff).toHaveBeenCalledWith({
          quality: normalizeQ(passedQuality),
        });
      });

      test('does nothing in case the output is png', async () => {
        sharp.metadata.mockResolvedValueOnce({ format: 'png' });
        await op({
          image: sharp,
          otherOps: [
            { name: 'o', op: async ({ image }) => image, params: ['original'] },
          ],
          req,
        });
        expect(sharp.png).not.toHaveBeenCalled();
      });
    });
  });
});
