require('./init'); // eslint-disable-line import/order
const micro = require('micro');
const caravaggio = require('dev');
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
  describe('Quality', () => {
    test('to 100', async () => {
      const response = await got(`/o_png,q_100/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('to 50', async () => {
      const response = await got(`/o_png,q_50/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('to 10', async () => {
      const response = await got(`/o_png,q_10/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
