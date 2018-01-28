const path = require('path');

module.exports = {
  // port: parseInt(process.env.PORT, 10) || 8655,
  persistor: {
    type: 'file', // availabe: file
    options: {
      basePath: path.resolve('../cache'),
    },
  },
};

