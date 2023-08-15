import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Cv-gen API')
  .setDescription('This is a cv-gen api.')
  .setVersion('1.0')
  .build();
