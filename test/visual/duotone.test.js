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
  describe('Duotone', () => {
    test('Apply duotone', async () => {
      const response = await got(`/duotone_7aff62_6b11ca,o_png,q_90/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('Apply duotone with an opacity', async () => {
      const response = await got(`/duotone_7aff62_6b11ca_0.5,o_png,q_90/${BASE_IMAGE}`, { baseUrl, encoding: null });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
