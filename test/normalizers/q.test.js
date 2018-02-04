const { URL } = require('url');
const { createPipeline } = require('../mocks/pipeline');
const q = require('../../src/normalizers/q');

describe('Quality', () => {
  test('q is a function', () => {
    expect(q).toBeInstanceOf(Function);
  });

  test('q returns a function as operation', () => {
    expect(q(90)).toEqual(expect.objectContaining({
      output: [
        {
          name: 'q',
          operation: expect.any(Function),
          params: [],
        },
      ],
    }));
  });

  describe('Given an output has been specified', () => {
    const qualityGenerator = q(90).output[0].operation;

    test('add quality if the output is jpeg', () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'jpeg',
        output: [
          {
            name: 'o',
            operation: 'jpeg',
            params: [],
          },
        ],
      };
      const pipeline = createPipeline(url, options);
      const operations = qualityGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'q',
          operation: 'jpeg',
          params: [{ quality: 90 }],
        }),
      ]));
    });

    test('add quality if the output is jpg', () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'jpg',
        output: [
          {
            name: 'o',
            operation: 'jpeg',
            params: [],
          },
        ],
      };
      const pipeline = createPipeline(url, options);
      const operations = qualityGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'q',
          operation: 'jpeg',
          params: [{ quality: 90 }],
        }),
      ]));
    });

    test('add quality if the output is webp', () => {
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
      const operations = qualityGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'q',
          operation: 'webp',
          params: [{ quality: 90 }],
        }),
      ]));
    });

    test('add quality if the output is tiff', () => {
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
      const pipeline = createPipeline(url, options);
      const operations = qualityGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'q',
          operation: 'tiff',
          params: [{ quality: 90 }],
        }),
      ]));
    });

    test('does nothing in case the output is png', () => {
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
      const operations = qualityGenerator(pipeline);
      expect(operations).toHaveLength(0);
    });
  });

  describe('Given the output as "original"', () => {
    const qualityGenerator = q(90).output[0].operation;

    test('add quality if the output is jpeg', () => {
      const url = new URL('https://image.com/image.jpeg');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      const operations = qualityGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'q',
          operation: 'jpeg',
          params: [{ quality: 90 }],
        }),
      ]));
    });

    test('add quality if the output is jpg', () => {
      const url = new URL('https://image.com/image.jpg');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      const operations = qualityGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'q',
          operation: 'jpeg',
          params: [{ quality: 90 }],
        }),
      ]));
    });

    test('add quality if the output is webp', () => {
      const url = new URL('https://image.com/image.webp');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      const operations = qualityGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'q',
          operation: 'webp',
          params: [{ quality: 90 }],
        }),
      ]));
    });

    test('add quality if the output is tiff', () => {
      const url = new URL('https://image.com/image.tiff');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      const operations = qualityGenerator(pipeline);
      expect(operations).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'q',
          operation: 'tiff',
          params: [{ quality: 90 }],
        }),
      ]));
    });

    test('does nothing in case the output is png', () => {
      const url = new URL('https://image.com/image.png');
      const options = {
        o: 'original',
        output: [],
      };
      const pipeline = createPipeline(url, options);
      const operations = qualityGenerator(pipeline);
      expect(operations).toHaveLength(0);
    });
  });
});

