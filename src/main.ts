import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import redis from 'redis';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let RedisStore = connectRedis(session);

  // global auto validation
  app.useGlobalPipes(new ValidationPipe());

  // initialize sessions
  app.use(
    session({
      cookie: {
        /*secure: false,*/
        maxAge: 86400000, // 1 day
      },
      store: new RedisStore({
        client: redis.createClient({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        }),
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
