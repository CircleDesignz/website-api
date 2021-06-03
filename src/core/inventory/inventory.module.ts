import { forwardRef, Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { InventoryService } from './services/inventory.service';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryRepository } from './repositories/inventory.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryRepository]),
    forwardRef(() => OrdersModule),
  ],
  exports: [InventoryService],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
