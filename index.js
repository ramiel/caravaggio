const config = require('config');
const micro = require('micro');
const app = require('./src');

const port = config.get('port');

const server = micro(app);
server.listen(port);

console.log(`Server started.
Listen on port: ${port}.`);
// Persistor: ${persistorType}
// Persistor Options: ${Object.entries(persistorOptions).map(([key, value]) => `
//   ${key}: ${value}`).join('')}

