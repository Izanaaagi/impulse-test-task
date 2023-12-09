import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerConfig } from './common/config/server/types/interfaces/server-config.interface';
import { ConfigTokens } from './common/config/config-tokens.enum';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { useSwagger } from './common/config/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const { port, enableSwagger, version, apiTitle } =
    configService.get<ServerConfig>(ConfigTokens.SERVER);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: version });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  useSwagger({ title: apiTitle, app, version, isEnabled: enableSwagger });

  await app.listen(port);
}
bootstrap();
