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
const server = caravaggio(config);

export default async (req: VercelRequest, res: VercelResponse) => {
  server(req, res);
};
