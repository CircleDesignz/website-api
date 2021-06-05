import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from '../catalog/catalog.module';
import { CustomersService } from '../customers/services/customers.service';
import { InventoryModule } from '../inventory/inventory.module';
import { OrdersController } from './controllers/orders.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    forwardRef(() => CustomersService),
    forwardRef(() => CatalogModule)
  ],
  exports: [OrdersService],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
