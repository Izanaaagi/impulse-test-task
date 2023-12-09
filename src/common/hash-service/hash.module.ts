import { Module } from '@nestjs/common';
import { BcryptAdapter } from './bcrypt.adapter';
import { HashService } from './hash.service';

@Module({
  providers: [
    {
      provide: HashService,
      useClass: BcryptAdapter,
    },
  ],
  exports: [
    {
      provide: HashService,
      useClass: BcryptAdapter,
    },
  ],
})
export class HashModule {}
