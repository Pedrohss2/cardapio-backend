import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './errors/exceptionFilter';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.useGlobalFilters(new AllExceptionsFilter());

  const mainConfig = new DocumentBuilder()
    .setTitle('Cardápio App')
    .setDescription('API para Cardápio App')
    .setVersion('1.0')
    .build();
  const mainDocument = SwaggerModule.createDocument(app, mainConfig);
  SwaggerModule.setup('api', app, mainDocument);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
