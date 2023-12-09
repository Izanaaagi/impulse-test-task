import { DatabaseConfig } from './types/interfaces/database-config.interface';
import { ConfigTokens } from '../config-tokens.enum';
import { configStringToBoolean } from '../helpers/config-string-to-boolean.helper';
import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const databaseConfig = registerAs(
  ConfigTokens.DATABASE,
  (): DatabaseConfig => ({
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    synchronize: configStringToBoolean(process.env.DB_SYNCHRONIZE),
    logging: configStringToBoolean(process.env.DB_LOGGING),
    entities: ['{dist,./}./**/*.entity.js'],
    migrations: ['{src,dist,./}/common/database/migrations/*.js'],
    subscribers: ['{dist,./}./**/*.subscriber.js'],
    autoLoadEntities: configStringToBoolean(process.env.DB_AUTO_LOAD_ENTITIES),
    migrationsRun: configStringToBoolean(process.env.DB_AUTO_LOAD_MIGRATIONS),
    namingStrategy: new SnakeNamingStrategy(),
  }),
);
