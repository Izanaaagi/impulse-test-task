import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authenticaiton/authentication.module';

@Module({
  imports: [UsersModule, AuthenticationModule],
})
export class BusinessLogicModule {}
