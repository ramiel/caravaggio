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
  describe('Duotone', () => {
    test('Apply duotone', async () => {
      const response = await got(
        `duotone,h:7aff62,s:6b11ca/o:png/q:90?image=${BASE_IMAGE}`,
        { prefixUrl, responseType: 'buffer' }
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('Apply duotone with an opacity', async () => {
      const response = await got(
        `duotone,h:7aff62,s:6b11ca,o:0.5/o:png/q:90?image=${BASE_IMAGE}`,
        { prefixUrl, responseType: 'buffer' }
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
