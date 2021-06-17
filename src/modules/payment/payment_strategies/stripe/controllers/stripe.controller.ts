import { Controller, Get } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from '../services/stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly _stripeService: StripeService) {}

  @Get()
  async getBalance(): Promise<Stripe.Balance> {
    return this._stripeService.getBalance();
  }

}
