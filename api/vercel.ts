import { createConfigManager } from 'configuring';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import defaultConfig, { Config } from '../src/config/default';
import caravaggio from '../src';

const configManager = createConfigManager<Config>({
  configurations: {
    default: defaultConfig,
  },
});

const config = configManager.getConfig();
const server = caravaggio({
  ...config,
  caches: {
    input: {
      type: 'memory',
      options: {
        limit: 100,
      },
    },
  },
  logger: {
    options: {
      prettyPrint: false,
    },
  },
});

export default async (req: VercelRequest, res: VercelResponse) => {
  server(req, res);
};
