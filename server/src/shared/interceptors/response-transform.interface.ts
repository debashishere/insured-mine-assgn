import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const defaultResponse = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: 'Success',
          data: data,
        };

        if (data && data.message) {
          defaultResponse.message = data.message;
          defaultResponse.data = data.result;
        }

        return defaultResponse;
      }),
    );
  }
}
