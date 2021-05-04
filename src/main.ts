import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import Dinero from 'dinero.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  Dinero.defaultCurrency = 'CAD';
  await app.listen(3000);
}
bootstrap();

