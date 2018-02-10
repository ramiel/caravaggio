const config = require('config');
const pino = require('pino');

const { level, stream, pretty } = config.get('logger');
const outStream = ['stderr', 'stdout'].indexOf(stream.toLowerCase())
  ? process[stream.toLowerCase()]
  : process.stdout;

module.exports = pino({
  name: 'caravaggio',
  level,
  prettyPrint: pretty,
}, outStream);

