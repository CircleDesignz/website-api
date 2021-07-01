import { ForbiddenException } from '@nestjs/common';

export class AdminValidationException extends ForbiddenException {
  constructor(message: string) {
    super(message);
  }
}
