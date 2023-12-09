import { INestApplication } from '@nestjs/common';

export interface SwaggerOptions {
  title: string;
  app: INestApplication;
  isEnabled: boolean;
  version: string;
}
