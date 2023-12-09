import { Module } from '@nestjs/common';
import { serverConfig } from './server/server.config';
import { databaseConfig } from './database/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, databaseConfig],
    }),
  ],
})
export class ConfigurationModule {}
