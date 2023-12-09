import { UserAuthConfig } from './types/interfaces/user-auth-config.interface';
import { ConfigTokens } from '../config-tokens.enum';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const userAuthConfig = registerAs(
  ConfigTokens.USER_AUTH,
  (): UserAuthConfig => ({
    accessTokenSecret: process.env.USER_JWT_SECRET_AT,
    accessTokenTTL: process.env.USER_JWT_EXPIRES_AT,
    refreshTokenSecret: process.env.USER_JWT_SECRET_RT,
    refreshTokenTTL: process.env.USER_JWT_EXPIRES_RT,
    passwordSaltRounds: +process.env.PASSWORD_SALT_ROUNDS
  }),
);
