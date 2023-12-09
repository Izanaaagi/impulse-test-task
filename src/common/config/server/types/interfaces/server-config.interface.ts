import { Environment } from '../enums/environment.enum';

export interface ServerConfig {
  port: string;
  environment: Environment;
  enableSwagger: boolean;
  apiTitle: string;
  version: string;
}
