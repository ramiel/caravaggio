const pino = require('pino');

let logger;

module.exports = {
  createLogger: (config) => {
    if (logger) {
      throw new Error('Logger has been already created');
    }
    const { level, stream, pretty } = config.logger;
    const outStream = ['stderr', 'stdout'].indexOf(stream.toLowerCase())
      ? process[stream.toLowerCase()]
      : process.stdout;

    logger = pino({
      name: 'caravaggio',
      level,
      prettyPrint: pretty,
    }, outStream);
    return logger;
  },

  getLogger: () => {
    if (!logger) {
      throw new Error('Logger must be created first');
    }
    return logger;
  },
};

