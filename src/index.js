const config = require('config');
const router = require('./router');

const whitelist = config.get('whitelist');

module.exports = router(config)({ whitelist });

