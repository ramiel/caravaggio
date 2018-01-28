const config = require('config');
const micro = require('micro');
const router = require('./src');

const server = micro(router);

server.listen(config.get('port'));
