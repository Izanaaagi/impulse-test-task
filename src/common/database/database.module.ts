import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../config/database/types/interfaces/database-config.interface';
import { ConfigTokens } from '../config/config-tokens.enum';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<DatabaseConfig>(ConfigTokens.DATABASE);
      },
    }),
  ],
})
export class DatabaseModule {}
