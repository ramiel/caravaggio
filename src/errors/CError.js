module.exports = class CError extends Error {
  constructor(message, docUri, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.docUri = docUri;
  }

  getUri() {
    return this.docUri;
  }
};

