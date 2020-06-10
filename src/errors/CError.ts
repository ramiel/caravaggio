class CError extends Error {
  public statusCode: number;
  public docUri: string;

  constructor(message: string, docUri: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.docUri = docUri;
  }

  getUri() {
    return this.docUri;
  }
}

export default CError;
