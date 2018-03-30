const BadRequestError = require('./BadRequestError');

module.exports = class UnknownOperationError extends BadRequestError {
  constructor(operation) {
    super(`Unknown operation "${operation}"`, 'docs.html');
  }
};

