const pipeline = require('../mocks/pipeline.mock');
const progressive = require('../../src/normalizers/progressive');
const sharp = require('../mocks/sharp.mock');

describe('Progressive', () => {
  beforeEach(() => {
    sharp.mockClear();
    pipeline.mockClear();
  });

  test('prgressive is a function', () => {
    expect(progressive).toBeInstanceOf(Function);
  });

  test('progressive throw if the value is not a boolean', () => {
    expect(() => progressive('hello')).toThrow();
  });

  test('progressive does NOT throw if the value is missing', () => {
    expect(() => progressive()).not.toThrow();
  });

  test('progressive returns a function as operation', () => {
    expect(progressive('true')).toEqual(expect.objectContaining({
      output: [
        {
          name: 'progressive',
          fn: expect.any(Function),
          params: [true],
        },
      ],
    }));
  });

  describe('Given an output has been specified', () => {
    test('force to false if progressive is false', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'jpeg' });
      const { output: [{ fn }] } = progressive('false');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: false });
    });

    test('add progressive if the output is jpeg', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'jpeg' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: true });
    });

    test('add progressive if the output is jpg', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'jpg' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: true });
    });

    test('add nothing if the output is webp', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'webp' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.webp).not.toHaveBeenCalled();
    });

    test('add nothing if the output is tiff', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'tiff' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.tiff).not.toHaveBeenCalled();
    });

    test('add progressive in case the output is png', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'png' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.png).toHaveBeenCalledTimes(1);
      expect(sharp.png).toHaveBeenCalledWith({ progressive: true });
    });
  });

  describe('Given the output as "original"', () => {
    test('force to false if progressive is false', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'original' });
      const { output: [{ fn }] } = progressive('false');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: false });
    });

    test('add progressive if the output is jpeg', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'jpeg' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: true });
    });

    test('add progressive if the output is jpg', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'jpg' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledTimes(1);
      expect(sharp.jpeg).toHaveBeenCalledWith({ progressive: true });
    });

    test('add nothing if the output is webp', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'original' });
      sharp.metadata.mockResolvedValueOnce({ format: 'webp' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.webp).not.toHaveBeenCalled();
    });

    test('add nothing if the output is tiff', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'original' });
      sharp.metadata.mockResolvedValueOnce({ format: 'tiff' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.webp).not.toHaveBeenCalled();
    });

    test('add progressive if the output is png', async () => {
      pipeline.getOptions.mockReturnValueOnce({ o: 'original' });
      sharp.metadata.mockResolvedValueOnce({ format: 'png' });
      const { output: [{ fn }] } = progressive('true');
      await fn(sharp, pipeline);
      expect(pipeline.getOptions).toHaveBeenCalledTimes(1);
      expect(sharp.png).toHaveBeenCalledTimes(1);
      expect(sharp.png).toHaveBeenCalledWith({ progressive: true });
    });
  });
});

