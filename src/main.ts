import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global auto validation
  app.useGlobalPipes(new ValidationPipe());

  // use sessions
  app.use(
    session({
      secret: 'secret=key',
      resave: false,
      saveUninitialized: false,
    })
  );

  // initialize passport sessions
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
