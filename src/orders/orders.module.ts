import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { OrderBuilder } from './builders/order.builder';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CustomersModule],
  exports: [OrdersService, OrderBuilder],
  providers: [
    OrdersService,
    {
      provide: OrderBuilder,
      useValue: OrderBuilder,
    }
  ],
  controllers: [OrdersController],
})

export class OrdersModule {}
