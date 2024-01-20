import { createConfigManager } from 'configuring';
import micro from 'micro';
import defaultConfig, { Config } from './config/default';
import caravaggio from './index';
import createLogger from './logger';

const configManager = createConfigManager<Config>({
  configurations: {
    default: defaultConfig,
  },
});

const config = configManager.getConfig();
const port = process.env.PORT ? parseInt(process.env.PORT) : 8565;

const logger = createLogger(config);
const server = micro(caravaggio(config));

server.listen(port);

logger.info(
  `Caravaggio started on port ${port}. Preview at http://localhost:${port}`,
);
