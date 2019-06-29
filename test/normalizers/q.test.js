const pipeline = require('../mocks/pipeline.mock');
const sharp = require('../mocks/sharp.mock');

const q = require('../../src/normalizers/q');

const normalizeQ = quality => (quality * 80) / 100;

describe('Quality', () => {
  beforeEach(() => {
    sharp.mockClear();
    pipeline.mockClear();
  });

  test('q is a function', () => {
    expect(q).toBeInstanceOf(Function);
  });

  test('q returns a function as operation', () => {
    expect(q(90)).toEqual(expect.objectContaining({
      output: [
        {
          name: 'q',
          fn: expect.any(Function),
          params: [],
        },
      ],
    }));
  });

  test('round the quality', async () => {
    const { output: [{ fn }] } = q(47);
    await fn(sharp, pipeline);
    expect(sharp.jpeg).toHaveBeenCalledTimes(1);
    expect(sharp.jpeg).toHaveBeenCalledWith({ quality: 38 });
  });

  describe('Evaluate quality', () => {
    const passedQuality = 90;
    const { output: [{ fn }] } = q(passedQuality);

    describe('Given an output has been specified', () => {
      test('add quality if the output is jpeg', async () => {
        await fn(sharp, pipeline);
        expect(sharp.jpeg).toHaveBeenCalledTimes(1);
        expect(sharp.jpeg).toHaveBeenCalledWith({ quality: normalizeQ(passedQuality) });
      });

      test('add quality if the output is jpg', async () => {
        pipeline.getOptions.mockReturnValueOnce({ o: 'jpg' });
        await fn(sharp, pipeline);
        expect(sharp.jpeg).toHaveBeenCalledTimes(1);
        expect(sharp.jpeg).toHaveBeenCalledWith({ quality: normalizeQ(passedQuality) });
      });

      test('add quality if the output is webp', async () => {
        pipeline.getOptions.mockReturnValueOnce({ o: 'webp' });
        await fn(sharp, pipeline);
        expect(sharp.webp).toHaveBeenCalledTimes(1);
        expect(sharp.webp).toHaveBeenCalledWith({ quality: normalizeQ(passedQuality) });
      });

      test('add quality if the output is tiff', async () => {
        pipeline.getOptions.mockReturnValueOnce({ o: 'tiff' });
        await fn(sharp, pipeline);
        expect(sharp.tiff).toHaveBeenCalledTimes(1);
        expect(sharp.tiff).toHaveBeenCalledWith({ quality: normalizeQ(passedQuality) });
      });

      test('does nothing in case the output is png', async () => {
        pipeline.getOptions.mockReturnValueOnce({ o: 'png' });
        await fn(sharp, pipeline);
        expect(sharp.png).not.toHaveBeenCalled();
      });
    });


    describe('Given the output as "original"', () => {
      beforeEach(() => {
        pipeline.getOptions.mockReturnValueOnce({ o: 'original' });
      });

      test('add quality if the output is jpeg', async () => {
        await fn(sharp, pipeline);
        expect(sharp.jpeg).toHaveBeenCalledTimes(1);
        expect(sharp.jpeg).toHaveBeenCalledWith({ quality: normalizeQ(passedQuality) });
      });

      test('add quality if the output is webp', async () => {
        sharp.metadata.mockResolvedValueOnce({ format: 'webp' });
        await fn(sharp, pipeline);
        expect(sharp.webp).toHaveBeenCalledTimes(1);
        expect(sharp.webp).toHaveBeenCalledWith({ quality: normalizeQ(passedQuality) });
      });

      test('add quality if the output is tiff', async () => {
        sharp.metadata.mockResolvedValueOnce({ format: 'tiff' });
        await fn(sharp, pipeline);
        expect(sharp.tiff).toHaveBeenCalledTimes(1);
        expect(sharp.tiff).toHaveBeenCalledWith({ quality: normalizeQ(passedQuality) });
      });

      test('does nothing in case the output is png', async () => {
        sharp.metadata.mockResolvedValueOnce({ format: 'png' });
        await fn(sharp, pipeline);
        expect(sharp.png).not.toHaveBeenCalled();
      });
    });
  });
});

