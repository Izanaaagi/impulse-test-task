import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface DatabaseConfig extends PostgresConnectionOptions {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
  logging: boolean;
}
