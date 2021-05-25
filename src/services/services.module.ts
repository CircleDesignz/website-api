import { Customer } from '@common/entities/customers/customer.entity';
import { InventoryUnit } from '@common/entities/inventory/inventory-unit.entity';
import { Product } from '@common/entities/inventory/product.entity';
import { Order } from '@common/entities/orders/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory/inventory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryUnit, Product, Order, Customer]),
  ],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class ServicesModule {}
