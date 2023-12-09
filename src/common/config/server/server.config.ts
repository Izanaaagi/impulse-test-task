import { ServerConfig } from './types/interfaces/server-config.interface';
import { ConfigTokens } from '../config-tokens.enum';
import { Environment } from './types/enums/environment.enum';
import { configStringToBoolean } from '../helpers/config-string-to-boolean.helper';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const serverConfig = registerAs(
  ConfigTokens.SERVER,
  (): ServerConfig => ({
    port: process.env.API_PORT,
    environment: Environment[process.env.NODE_ENV],
    enableSwagger: configStringToBoolean(process.env.ENABLE_SWAGGER),
    version: process.env.API_VERSION,
    apiTitle: process.env.API_TITLE,
  }),
);
