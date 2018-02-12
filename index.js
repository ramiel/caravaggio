const config = require('config');
const micro = require('micro');
const logger = require('./src/logger');
const app = require('./src');

logger.debug(config, 'configuration:');
const port = config.get('port');

const server = micro(app);
server.listen(port);

logger.info(`Server started. Listen on port: ${port}.`);

