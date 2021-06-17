import { Module } from '@nestjs/common';
import { CheckoutController } from './controllers/checkout.controller';
import { CheckoutService } from './services/checkout.service';

@Module({
  providers: [CheckoutService],
  controllers: [CheckoutController]
})
export class CheckoutModule {}
