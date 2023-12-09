import { ClassConstructor, ClassTransformOptions } from 'class-transformer';
import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

export function Serialize(
  dto: ClassConstructor<any>,
  options: ClassTransformOptions = { strategy: 'excludeAll' },
  key?: string,
) {
  return UseInterceptors(new SerializeInterceptor(dto, options, key));
}
