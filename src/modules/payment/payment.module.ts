import { Module } from '@nestjs/common';
import { PaypalModule } from './payment_strategies/paypal/paypal.module';
import { StripeModule } from './payment_strategies/stripe/stripe.module';

@Module({
  imports: [StripeModule, PaypalModule],
})
export class PaymentModule {}
