import { Module } from '@nestjs/common';
import { StripeController } from './controllers/stripe.controller';
import { StripeService } from './services/stripe.service';
import stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

const stripe_injection_token = "STRIPE_INJECTION_TOKEN" // TODO: move to constants

@Module({
  providers: [
    StripeService,
    {
      provide: stripe_injection_token,
      useFactory: async (configService: ConfigService) => {
        return new stripe.Stripe(configService.get('STRIPE_TOKEN'), {
          apiVersion: '2020-08-27',
        });
      },
      inject: [ConfigService]
    },
  ],
  controllers: [StripeController],
})
export class StripeModule {}
