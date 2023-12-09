import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  constructor(
    private _dto: ClassConstructor<any>,
    private _options?: ClassTransformOptions,
    private _key?: string,
  ) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        if (this._key) {
          return {
            ...data,
            [this._key]: plainToInstance(
              this._dto,
              data[this._key],
              this._options,
            ),
          };
        }
        return plainToInstance(this._dto, data, this._options);
      }),
    );
  }
}
