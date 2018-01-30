const { router, get } = require('microrouter');
const indexRoute = require('./routes/index');
const Cache = require('./cache');


module.exports = persistor => router(get('/*/*', indexRoute(Cache(persistor))));
