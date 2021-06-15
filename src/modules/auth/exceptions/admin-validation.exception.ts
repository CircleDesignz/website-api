export class AdminValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdminValidationError';
  }
}
