import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  providers: [AuthenticationService, AtStrategy, RtStrategy, LocalStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
