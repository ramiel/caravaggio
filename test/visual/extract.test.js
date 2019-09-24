require('./init'); // eslint-disable-line import/order
const micro = require('micro');
const caravaggio = require('dev');
const listen = require('test-listen');
const got = require('got');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });
const BASE_IMAGE = 'https://caravaggio.ramielcreations.com/docs/assets/example/cakes_original.jpeg';
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
  describe('Extract', () => {
    test('a portion of the image', async () => {
      const response = await got(`/ex_95_35_100_100,o_png,q_90/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
