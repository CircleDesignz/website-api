export class AdminExistsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminExistsException"
  }
}