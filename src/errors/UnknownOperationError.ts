import BadRequestError from './BadRequestError';

export default class UnknownOperationError extends BadRequestError {
  constructor(operation: string) {
    super(`Unknown operation "${operation}"`, 'docs.html');
  }
}
