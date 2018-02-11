const { URL } = require('url');
const { createPipeline } = require('../mocks/pipeline');
const progressive = require('../../src/normalizers/progressive');

describe('Progressive', () => {
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
          operation: expect.any(Function),
          params: [],
        },
      ],
    }));
  });

  describe('Given an output has been specified', () => {
    const progressiveGenerator = progressive('true').output[0].operation;

    test('force to false if progressive is false', async () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'jpeg',
        output: [
          {
            name: 'progressive',
            operation: 'jpeg',
            params: [],
          },
        ],
      };
      const pipeline = createPipeline(url, options);
      const operations = await progressive('false').output[0].operation(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'progressive',
          operation: 'jpeg',
          params: [{ progressive: false }],
        }),
      ]));
    });

    test('add progressive if the output is jpeg', async () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'jpeg',
        output: [
          {
            name: 'progressive',
            operation: 'jpeg',
            params: [],
          },
        ],
      };
      const pipeline = createPipeline(url, options);
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'progressive',
          operation: 'jpeg',
          params: [{ progressive: true }],
        }),
      ]));
    });

    test('add progressive if the output is jpg', async () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'jpg',
        output: [
          {
            name: 'progressive',
            operation: 'jpeg',
            params: [],
          },
        ],
      };
      const pipeline = createPipeline(url, options);
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'progressive',
          operation: 'jpeg',
          params: [{ progressive: true }],
        }),
      ]));
    });

    test('add nothing if the output is webp', async () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'webp',
        output: [
          {
            name: 'o',
            operation: 'webp',
            params: [],
          },
        ],
      };
      const pipeline = createPipeline(url, options);
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toHaveLength(0);
    });

    test('add nothing if the output is tiff', async () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'tiff',
        output: [
          {
            name: 'o',
            operation: 'tiff',
            params: [],
          },
        ],
      };
      const pipeline = await createPipeline(url, options);
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toHaveLength(0);
    });

    test('add progressive in case the output is png', async () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'png',
        output: [
          {
            name: 'o',
            operation: 'png',
            params: [],
          },
        ],
      };
      const pipeline = createPipeline(url, options);
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'progressive',
          operation: 'png',
          params: [{ progressive: true }],
        }),
      ]));
    });
  });

  describe('Given the output as "original"', () => {
    const progressiveGenerator = progressive('true').output[0].operation;

    test('force to false if progressive is false', async () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      const operations = await progressive('false').output[0].operation(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'progressive',
          operation: 'jpeg',
          params: [{ progressive: false }],
        }),
      ]));
    });

    test('add progressive if the output is jpeg', async () => {
      const url = new URL('https://image.com/image.jpeg');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'progressive',
          operation: 'jpeg',
          params: [{ progressive: true }],
        }),
      ]));
    });

    test('add progressive if the output is jpg', async () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'progressive',
          operation: 'jpeg',
          params: [{ progressive: true }],
        }),
      ]));
    });

    test('add nothing if the output is webp', async () => {
      const url = new URL('https://image.com/image.webp');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      pipeline.setMetadata({ format: 'webp' });
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toHaveLength(0);
    });

    test('add nothing if the output is tiff', async () => {
      const url = new URL('https://image.com/image.tiff');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      pipeline.setMetadata({ format: 'tiff' });
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toHaveLength(0);
    });

    test('add progressive in case the output is png', async () => {
      const url = new URL('https://image.com/image.png');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      pipeline.setMetadata({ format: 'png' });
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'progressive',
          operation: 'png',
          params: [{ progressive: true }],
        }),
      ]));
    });

    test('add progressive even if the url has no extension', async () => {
      const url = new URL('https://image.com/image');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      const operations = await progressiveGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'progressive',
          operation: 'jpeg',
          params: [{ progressive: true }],
        }),
      ]));
    });
  });
});

