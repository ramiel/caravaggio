const config = require('config');

const configProxy = {
  get: jest.fn((...args) => config.get(...args)),
  mockClear: () => {
    configProxy.get.mockClear();
  },
};

module.exports = configProxy;
