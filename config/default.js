const path = require('path');

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8565,
  persistor: {
    type: 'file', // availabe: file, memory
    options: {
      basePath: path.resolve(__dirname, '../cache'),
    },
  },
  compress: true,
};

