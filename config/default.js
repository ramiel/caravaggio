const path = require('path');

module.exports = {
  persistor: {
    type: 'file', // availabe: file, memory
    options: {
      basePath: path.resolve(__dirname, '../cache'),
    },
  },
};

