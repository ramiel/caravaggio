require('./init'); // eslint-disable-line import/order
const micro = require('micro');
const caravaggio = require('dev');
const listen = require('test-listen');
const got = require('got');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });
const BASE_IMAGE = 'https://ramiel.gitlab.io/caravaggio/docs/assets/example/girls_small.jpeg';
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
  describe('Overlay', () => {
    test('add animage on a new layer', async () => {
      const response = await got(`/overlay_https%3A%2F%2Framiel.gitlab.io%2Fcaravaggio%2Fimg%2Fcaravaggio-logo.jpeg,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('add animage with specific gravity', async () => {
      const response = await got(`/overlay_https%3A%2F%2Framiel.gitlab.io%2Fcaravaggio%2Fimg%2Fcaravaggio-logo.jpeg_gsw,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('add animage with coordinates', async () => {
      const response = await got(`/overlay_https%3A%2F%2Framiel.gitlab.io%2Fcaravaggio%2Fimg%2Fcaravaggio-logo.jpeg_x100_y0.6,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('add an image as watermark', async () => {
      const response = await got(`/overlay_"https%3A%2F%2Fgitlab.com%2Framiel%2Fcaravaggio%2Fraw%2Fmaster%2Fwebsite%2Fstatic%2Fimg%2Foverlay.png%3Finline%3Dfalse"_watermark,o_png,q_${QUALITY}/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});

