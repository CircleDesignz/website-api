import { Inject, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { STRIPE_INJECTION_TOKEN } from '../constants/di-tokens';

@Injectable()
export class StripeService {
  constructor(
    @Inject(STRIPE_INJECTION_TOKEN) private readonly _stripeInstance: Stripe
  ) {}

  async getBalance(): Promise<Stripe.Balance> {
    return this._stripeInstance.balance.retrieve();
  }

  async createCheckoutSession(
    methods: any,
    lineItems: any,
    successUrl: string,
    cancelUrl: string
  ): Promise<any> {
    const result = await this._stripeInstance.checkout.sessions.create({
      payment_method_types: methods,
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    // TODO: return redirect id
    return result;
  }
}
