const router = require('./router');

module.exports = (config) => {
  const { whitelist } = config;

  return router(config)({ whitelist });
};

