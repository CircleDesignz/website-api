import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockroomModule } from '@controllers/inventory/inventory.module';
import { ServicesModule } from '@services/services.module';
import { InventoryUnit } from '@common/entities/inventory/inventory-unit.entity';
import { Product } from '@common/entities/inventory/product.entity';
import { Order } from '@common/entities/orders/order.entity';
import { Customer } from '@common/entities/customers/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'circle_inventory',
      username: 'fx',
      password: '162301',
      entities: [InventoryUnit, Product, Order, Customer],
      synchronize: true, // TODO: Set false for production
    }),
    StockroomModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
