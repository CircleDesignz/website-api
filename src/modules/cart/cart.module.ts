import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import redis from 'redis';
import { CartRepository } from './repositories/cart.repository';
import { REDIS_TOKEN } from './constants/di-tokens';

@Module({
  providers: [
    CartService,
    CartRepository,
    {
      provide: REDIS_TOKEN,
      useFactory: async (configService: ConfigService) => {
        const client = redis.createClient({
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        });
        client.on('error', (err) => {
          console.error(err);
        });
        return client;
      },
      inject: [ConfigService],
    },
  ],
  controllers: [CartController],
})
export class CartModule {}
