import { forwardRef, Module } from '@nestjs/common';
import { InventoryModule } from '../inventory/inventory.module';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [forwardRef(() => InventoryModule)],
  exports: [OrdersService],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
