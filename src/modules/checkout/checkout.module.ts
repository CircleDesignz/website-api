import { Module } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { PaymentModule } from '../payment/payment.module';
import { CheckoutController } from './controllers/checkout.controller';
import { CheckoutService } from './services/checkout.service';

@Module({
  imports: [CartModule, PaymentModule],
  providers: [CheckoutService],
  controllers: [CheckoutController]
})
export class CheckoutModule {}
