const file = require('./file');
const memory = require('./memory');
const none = require('./none');

const basePersitorByType = {
  file,
  memory,
  none,
};

module.exports = {
  create: ({ type, options = {} }) => {
    const persistor = basePersitorByType[type];
    if (!persistor) {
      throw new Error(`Unknown persistor type ${type}. Check your configuration`);
    }
    return persistor(options);
  },
};

