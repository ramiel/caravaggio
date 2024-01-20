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
  describe('Rotate', () => {
    test('rotate 90', async () => {
      const response = await got(`rotate,v:90/o:png/q:90?image=${BASE_IMAGE}`, {
        prefixUrl,
        responseType: 'buffer',
      });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('rotate 450', async () => {
      const response = await got(
        `rotate,v:450/o:png/q:90?image=${BASE_IMAGE}`,
        {
          prefixUrl,
          responseType: 'buffer',
        },
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('rotate 12', async () => {
      const response = await got(`rotate,v:12/o:png/q:90?image=${BASE_IMAGE}`, {
        prefixUrl,
        responseType: 'buffer',
      });
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('rotate 12 with background color', async () => {
      const response = await got(
        `rotate,v:12,b:ff00ff/o:png/q:90?image=${BASE_IMAGE}`,
        {
          prefixUrl,
          responseType: 'buffer',
        },
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('rotate 12 with background color and alpha', async () => {
      const response = await got(
        `rotate,v:12,b:ff00ff.5/o:png/q:90?image=${BASE_IMAGE}`,
        { prefixUrl, responseType: 'buffer' },
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
