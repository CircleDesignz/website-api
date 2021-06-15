import { Module } from '@nestjs/common';
import { StripeController } from './controllers/stripe.controller';
import { StripeService } from './services/stripe.service';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { STRIPE_INJECTION_TOKEN } from './constants/di-tokens';

@Module({
  providers: [
    StripeService,
    {
      provide: STRIPE_INJECTION_TOKEN,
      useFactory: async (configService: ConfigService) => {
        return new Stripe.Stripe(configService.get('STRIPE_TOKEN'), {
          apiVersion: '2020-08-27',
        });
      },
      inject: [ConfigService]
    },
  ],
  controllers: [StripeController],
})
export class StripeModule {}
