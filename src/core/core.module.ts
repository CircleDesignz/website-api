import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { OrdersModule } from './orders/orders.module';
import { CatalogModule } from './catalog/catalog.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [InventoryModule, OrdersModule, CatalogModule, CustomersModule],
})
export class CoreModule {}
