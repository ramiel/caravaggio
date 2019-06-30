const micro = require('micro');
const { createLogger } = require('./src/logger');
const app = require('./src');

const caravaggio = (config) => {
  const { port } = config;
  const logger = createLogger(config);

  logger.debug(config, 'configuration:');

  const server = micro(app(config));
  server.listen(port);

  logger.info(`Server started. Listen on port: ${port}.`);
};

module.exports = caravaggio;

