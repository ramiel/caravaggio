require('./init'); // eslint-disable-line import/order
const micro = require('micro');
const caravaggio = require('index');
const listen = require('test-listen');
const got = require('got');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });
const BASE_IMAGE = 'https://ramiel.gitlab.io/caravaggio/docs/assets/example/girls_small.jpeg';
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
  describe('Rotate', () => {
    test('rotate 90', async () => {
      const response = await got(`/rotate_90,o_png,q_90/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('rotate 450', async () => {
      const response = await got(`/rotate_450,o_png,q_90/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('rotate 12', async () => {
      const response = await got(`/rotate_12,o_png,q_90/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('rotate 12 with background color', async () => {
      const response = await got(`/rotate_12_ff00ff,o_png,q_90/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('rotate 12 with background color and alpha', async () => {
      const response = await got(`/rotate_12_ff00ff.5,o_png,q_90/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
