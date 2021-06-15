import { Controller, Get } from '@nestjs/common';
import { StripeService } from '../services/stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly _stripeService: StripeService) {}

  @Get('/test')
  async test(): Promise<void> {
    this._stripeService.test();
  }
}
