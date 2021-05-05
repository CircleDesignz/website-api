import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryEntity } from './inventory-unit.entity';
import { OrderEntity } from '../orders/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity, OrderEntity])],
  providers: [InventoryService],
  controllers: [InventoryController],
})

export class InventoryModule {}
