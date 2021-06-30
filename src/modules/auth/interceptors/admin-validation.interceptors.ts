import { AdminValidationException } from '@circle/modules/auth/exceptions/admin-validation.exception';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminValidationInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe((error) => {
      if (error instanceof AdminValidationException) {
        throw new UnauthorizedException(error.message);
      } else {
        throw error;
      }
    });
  }
}
