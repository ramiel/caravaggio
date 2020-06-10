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
  describe('Quality', () => {
    test('to 100', async () => {
      const response = await got(`o:png/q:100?image=${BASE_IMAGE}`, {
        prefixUrl,
        responseType: 'buffer',
      });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('to 50', async () => {
      const response = await got(`o:png/q:50?image=${BASE_IMAGE}`, {
        prefixUrl,
        responseType: 'buffer',
      });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('to 10', async () => {
      const response = await got(`o:png/q:10?image=${BASE_IMAGE}`, {
        prefixUrl,
        responseType: 'buffer',
      });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
