import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SwaggerOptions } from './types/interfaces/swagger-options.interface';

export const useSwagger = ({
  app,
  version,
  isEnabled,
  title,
}: SwaggerOptions): void => {
  if (isEnabled) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(title)
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(
      app,
      swaggerConfig,
    );

    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });
  }
};
