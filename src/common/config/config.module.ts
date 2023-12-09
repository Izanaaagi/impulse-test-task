import { Module } from '@nestjs/common';
import { serverConfig } from './server/server.config';
import { databaseConfig } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
import { userAuthConfig } from './user-jwt/user-auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, databaseConfig, userAuthConfig],
    }),
  ],
})
export class ConfigurationModule {}
