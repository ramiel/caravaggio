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
  'https://caravaggio.ramielcreations.com/docs/assets/example/cakes_original.jpeg',
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
  describe('Extract', () => {
    test('a portion of the image', async () => {
      const response = await got(
        `ex,x:95,y:35,w:100,h:100/o:png/q:90?image=${BASE_IMAGE}`,
        {
          prefixUrl,
          responseType: 'buffer',
        },
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('a portion of the image defined through percentages', async () => {
      const response = await got(
        `ex,x:0.1,y:0.2,w:0.54,h:0.6/o:png/q:90?image=${BASE_IMAGE}`,
        {
          prefixUrl,
          responseType: 'buffer',
        },
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
