import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Image Generator')
    .setDescription('API for generating images using AI models')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.WHITE_LISTED_ORIGINS?.split(','),
    methods: 'GET,PUT,POST,OPTIONS',
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
