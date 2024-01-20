import got from 'got';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import micro from 'micro';
import listen from 'test-listen';
import caravaggio from '../..';
/* eslint-env jest */
import { initialise } from './init';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });
const BASE_IMAGE = encodeURIComponent(
  'https://caravaggio.ramielcreations.com/docs/assets/example/girls_small.jpeg',
);
let service: ReturnType<typeof micro>;
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
        { prefixUrl, responseType: 'buffer' },
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('Apply duotone with an opacity', async () => {
      const response = await got(
        `duotone,h:7aff62,s:6b11ca,o:0.5/o:png/q:90?image=${BASE_IMAGE}`,
        { prefixUrl, responseType: 'buffer' },
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
