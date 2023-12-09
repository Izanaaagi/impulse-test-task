import { DataSource } from 'typeorm';
import { databaseConfig } from '../config/database/database.config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig],
});

export const dataSource = new DataSource(databaseConfig());
