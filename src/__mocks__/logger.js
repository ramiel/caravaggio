/* eslint-env jest */

const logger = {
  info: jest.fn(),
  debug: jest.fn(),
  trace: jest.fn(),
  error: jest.fn(),
};

module.exports = {
  createLogger: (/* config */) => logger,
  getLogger: () => logger,
};
