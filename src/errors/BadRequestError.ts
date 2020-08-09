import CError from './CError';

class BadRequestError extends CError {
  constructor(message: string, docUri: string | null) {
    super(message || 'Bad request error', docUri, 400);
  }
}

export default BadRequestError;
