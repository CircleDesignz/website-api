import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryUnit } from './inventory/inventory-unit.entity';
import { Order } from './orders/order.entity';
import { Customer } from './customers/customer.entity';

@Module({
  // TODO: dotenv for this
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fx',
      password: '162301',
      database: 'circle_inventory',
      entities: [InventoryUnit, Order, Customer],
      synchronize: true,
    }),
    InventoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
