require('./init'); // eslint-disable-line import/order
const micro = require('micro');
const caravaggio = require('dev');
const listen = require('test-listen');
const got = require('got');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });
const BASE_IMAGE = 'https://caravaggio.ramielcreations.com/docs/assets/example/girls_small.jpeg';
const ATTENTION_IMAGE = 'https://caravaggio.ramielcreations.com/docs/assets/example/fill_original.png';
const QUALITY = 90;
let service;
let baseUrl;

beforeAll(async () => {
  service = micro(caravaggio);
  baseUrl = await listen(service);
});

afterAll(() => {
  service.close();
});

describe('Image manipulation', () => {
  describe('Resize', () => {
    describe('scale', () => {
      test('can resize', async () => {
        const response = await got(`/rs_200x300,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('specify scale', async () => {
        const response = await got(`/rs_200x300_scale,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('width only', async () => {
        const response = await got(`/rs_200x,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('height only', async () => {
        const response = await got(`/rs_x300,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('not keeping aspect ratio', async () => {
        const response = await got(`/rs_200x300_scale_iar,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('fit', () => {
      test('scale with fit', async () => {
        const response = await got(`/rs_300x300_fit,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('downfit', () => {
      test('scale with downfit', async () => {
        const response = await got(`/rs_300x300_downfit,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('dont scale with downfit if image is large', async () => {
        const response = await got(`/rs_800x500_downfit,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('upfit', () => {
      test('scale with upfit if the size if more', async () => {
        const response = await got(`/rs_641x481_upfit,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('dont scale with upfit if image is larger', async () => {
        const response = await got(`/rs_300x300_upfit,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('fill', () => {
      test('scale with fill if the size if more', async () => {
        const response = await got(`/rs_300x300_fill,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('scacle with fill to a larger destination', async () => {
        const response = await got(`/rs_650x370_fill,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('scacle with fill with gravity', async () => {
        const response = await got(`/rs_300x300_fill_ne,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('scacle with fill with gravity auto', async () => {
        const response = await got(`/rs_200x300_fill_auto,o_png,q_${QUALITY}/${ATTENTION_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('downfill', () => {
      test('scale with downfill if the image is larger', async () => {
        const response = await got(`/rs_300x300_downfill,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('scale with downfill if the image is larger with gravity', async () => {
        const response = await got(`/rs_300x300_downfill_sw,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('dont scale with downfill if the image is smaller', async () => {
        const response = await got(`/rs_641x361_downfill_sw,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });

    describe('embed', () => {
      test('embed the image', async () => {
        const response = await got(`/rs_320x240_embed,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('change color', async () => {
        const response = await got(`/rs_320x240_embed_b105072200,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });

      test('change color and gravity', async () => {
        const response = await got(`/rs_320x240_embed_b105072200_gnorth,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
        const image = response.body;
        expect(image).toMatchImageSnapshot();
      });
    });
  });
});
