import { AdminValidationException } from '@circle/modules/auth/exceptions/admin-validation.exception';
import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminValidationInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe((error) => {
      if (error instanceof AdminValidationException) {
        throw new ConflictException(error.message);
      } else {
        throw error;
      }
    });
  }
}
