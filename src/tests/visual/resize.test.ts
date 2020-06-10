/* eslint-env jest */
import { initialise } from './init';
import micro from 'micro';
import caravaggio from '../..';
import listen from 'test-listen';
import got from 'got';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
const BASE_IMAGE = encodeURIComponent(
  'https://caravaggio.ramielcreations.com/docs/assets/example/girls_small.jpeg'
);
const ATTENTION_IMAGE =
  'https://caravaggio.ramielcreations.com/docs/assets/example/fill_original.png';
const QUALITY = 90;
let service: any;
let prefixUrl: string;

beforeAll(async () => {
  const configManager = initialise();
  service = micro(caravaggio(configManager.getConfig()));
  prefixUrl = await listen(service);
});

afterAll(() => {
  service.close();
});

describe('Image manipulation', () => {
  describe('Resize', () => {
    describe('scale', () => {
      test('can resize', async () => {
        const response = await got(
          `rs,s:200x300/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('specify scale', async () => {
        const response = await got(
          `rs,s:200x300,m:scale/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('width only', async () => {
        const response = await got(
          `rs,s:200x/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('height only', async () => {
        const response = await got(
          `rs,s:x300/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('not keeping aspect ratio', async () => {
        const response = await got(
          `rs,s:200x300,m:scale,iar/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('fit', () => {
      test('scale with fit', async () => {
        const response = await got(
          `rs,s:300x300,m:fit/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('downfit', () => {
      test('scale with downfit', async () => {
        const response = await got(
          `rs,s:300x300,m:downfit/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('dont scale with downfit if image is large', async () => {
        const response = await got(
          `rs,s:800x500,m:downfit/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('upfit', () => {
      test('scale with upfit if the size if more', async () => {
        const response = await got(
          `rs,s:641x481,m:upfit/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('dont scale with upfit if image is larger', async () => {
        const response = await got(
          `rs,s:300x300,m:upfit/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('fill', () => {
      test('scale with fill if the size if more', async () => {
        const response = await got(
          `rs,s:300x300,m:fill/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('scacle with fill to a larger destination', async () => {
        const response = await got(
          `rs,s:650x370,m:fill/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('scacle with fill with gravity', async () => {
        const response = await got(
          `rs,s:300x300,m:fill,g:ne/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('scacle with fill with gravity auto', async () => {
        const response = await got(
          `rs,s:200x300,m:fill,g:auto/o:png/q:${QUALITY}?image=${ATTENTION_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('downfill', () => {
      test('scale with downfill if the image is larger', async () => {
        const response = await got(
          `rs,s:300x300,m:downfill/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('scale with downfill if the image is larger with gravity', async () => {
        const response = await got(
          `rs,s:300x300,m:downfill,g:sw/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('dont scale with downfill if the image is smaller', async () => {
        const response = await got(
          `rs,s:641x361,m:downfill,g:sw/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('embed', () => {
      test('embed the image', async () => {
        const response = await got(
          `rs,s:320x240,m:embed/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('change color', async () => {
        const response = await got(
          `rs,s:320x240,m:embed,b:105072200/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('change color and gravity', async () => {
        const response = await got(
          `rs,s:320x240,m:embed,b:105072200,g:north/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
          {
            prefixUrl,
            responseType: 'buffer',
          }
        );
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });
  });
});
