import { Inject, Injectable } from '@nestjs/common';
import stripe from 'stripe';
import { STRIPE_INJECTION_TOKEN } from '../constants/di-tokens';

@Injectable()
export class StripeService {
  constructor(
    @Inject(STRIPE_INJECTION_TOKEN) private readonly _stripeInstance: stripe
  ) {}

  async test(): Promise<any> {
    console.log(await this._stripeInstance.accounts.list());
  }
}
