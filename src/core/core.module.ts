import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [InventoryModule, OrdersModule],
})
export class CoreModule {}
