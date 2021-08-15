import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.time(`${context.getArgs()[3]?.fieldName} Request-Response time`);
    return next
      .handle()
      .pipe(
        tap(() =>
          console.timeEnd(
            `${context.getArgs()[3]?.fieldName} Request-Response time`,
          ),
        ),
      );
  }
}
