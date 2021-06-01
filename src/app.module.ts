import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@common/entities/inventory/product.entity';
import { Order } from '@common/entities/orders/order.entity';
import { CoreModule } from './core/core.module';
import { InventoryUnit } from '@common/entities/inventory/inventory-unit.entity';
import { Customer } from '@common/entities/customers/customer.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'circle_main',
      username: 'fx',
      password: '162301',
      entities: [
        InventoryUnit,
        Product,
        Order,
        Customer,
      ],
      synchronize: true, // TODO: Set false for production
    }),
    EventEmitterModule.forRoot(),
    CoreModule,
  ],
})
export class AppModule {}
