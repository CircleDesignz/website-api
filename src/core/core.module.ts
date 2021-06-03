import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { OrdersModule } from './orders/orders.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [InventoryModule, OrdersModule, CatalogModule],
})
export class CoreModule {}
