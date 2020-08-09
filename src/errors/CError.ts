class CError extends Error {
  public statusCode: number;
  public docUri: string | null = null;

  constructor(message: string, docUri: string | null, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.docUri = docUri;
  }

  getUri() {
    return this.docUri;
  }
}

export default CError;
