import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_INJECTION_TOKEN } from '../constants/di-tokens';

@Injectable()
export class StripeService {
  constructor(
    @Inject(STRIPE_INJECTION_TOKEN) private readonly _stripeInstance: Stripe
  ) {}

}
