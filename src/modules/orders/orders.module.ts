import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
