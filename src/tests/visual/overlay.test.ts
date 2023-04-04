/* eslint-env jest */
import { initialise } from './init';
import micro from 'micro';
import caravaggio from '../..';
import listen from 'test-listen';
import got from 'got';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });
const BASE_IMAGE = encodeURIComponent(
  'https://caravaggio.ramielcreations.com/docs/assets/example/girls_small.jpeg'
);
const QUALITY = 90;
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
  describe('Overlay', () => {
    test('add animage on a new layer', async () => {
      const response = await got(
        `overlay,url:https%3A%2F%2Fcaravaggio.ramielcreations.com%2Fdocs%2Fassets%2Fexample%2Fcaravaggio-logo.jpeg/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
        { prefixUrl, responseType: 'buffer' }
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('add animage with specific gravity', async () => {
      const response = await got(
        `overlay,url:https%3A%2F%2Fcaravaggio.ramielcreations.com%2Fdocs%2Fassets%2Fexample%2Fcaravaggio-logo.jpeg,g:sw/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
        { prefixUrl, responseType: 'buffer' }
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('add animage with coordinates', async () => {
      const response = await got(
        `overlay,url:https%3A%2F%2Fcaravaggio.ramielcreations.com%2Fdocs%2Fassets%2Fexample%2Fcaravaggio-logo.jpeg,x:100,y:0.6/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
        { prefixUrl, responseType: 'buffer' }
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });

    test('add an image as watermark', async () => {
      const response = await got(
        `overlay,url:https%3A%2F%2Fcaravaggio.ramielcreations.com%2Fdocs%2Fassets%2Fexample%2Foverlay.png,watermark/o:png/q:${QUALITY}?image=${BASE_IMAGE}`,
        { prefixUrl, responseType: 'buffer' }
      );
      const image = response.body;
      expect(image).toMatchImageSnapshot();
    });
  });
});
