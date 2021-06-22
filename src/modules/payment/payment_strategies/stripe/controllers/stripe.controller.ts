import { Controller, Get, Post } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from '../services/stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly _stripeService: StripeService) {}

  @Get()
  async getBalance(): Promise<Stripe.Balance> {
    return this._stripeService.getBalance();
  }

  @Get('pay')
  async testPay(): Promise<any> {
    return this._stripeService.createCheckoutSession(
      ['card'],
      [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      'http://test_success',
      'http://test_fail'
    );
  }
}
