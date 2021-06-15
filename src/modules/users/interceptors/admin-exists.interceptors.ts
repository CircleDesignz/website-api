import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminExistsException } from '../exceptions/admin-exists.exception';

@Injectable()
export class AdminExistsInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe((error) => {
      if (error instanceof AdminExistsException) {
        throw new ConflictException(error.message);
      } else {
        throw error;
      }
    });
  }
}
