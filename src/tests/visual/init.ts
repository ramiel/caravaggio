/* eslint-env jest */

import fetch from 'node-fetch';
import fsOrig from 'fs';
import path from 'path';
import got from 'got';
import { createConfigManager } from 'configuring';
import defaultConfig, { Config } from '../../config/default';
import testConfig from '../../config/test';

const fs = fsOrig.promises;
const cache = new Map();

(fetch as unknown as jest.Mock).mockImplementation(async (url: string) => {
  const knownLocation =
    'https://caravaggio.ramielcreations.com/docs/assets/example';
  if (url.indexOf(knownLocation) === 0) {
    const relativePath = url.slice(knownLocation.length);
    let data: Buffer;
    if (cache.has(relativePath)) {
      data = cache.get(relativePath);
    } else {
      data = await fs.readFile(
        path.join(__dirname, '..', 'fixtures', 'test-images', relativePath)
      );
      cache.set(relativePath, data);
    }
    return { buffer: async () => data };
  }
  const response = await got(url, {});
  return { buffer: () => response.body };
});

export const initialise = () => {
  const configManager = createConfigManager<Config>({
    configurations: {
      default: defaultConfig,
      test: testConfig,
    },
  });

  return configManager;
};
