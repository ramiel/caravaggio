const config = require('config');
const bunyan = require('bunyan');

const { level, stream } = config.get('logger');
const streams = ['stderr', 'stdout'].indexOf(stream.toLowerCase())
  ? [{
    level,
    stream: process[stream.toLowerCase()],
  }]
  : [{
    level,
    path: stream,
  }];

module.exports = bunyan.createLogger({
  name: 'caravaggio',
  streams,
});

