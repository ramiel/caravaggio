const CError = require('./CError');

module.exports = class BadRequestError extends CError {
  constructor(message, docUri) {
    super(message || 'Bad request error', docUri, 400);
  }
};

