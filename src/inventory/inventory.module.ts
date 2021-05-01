import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryUnit } from './inventory-unit.entity';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryUnit]), OrdersModule],
  providers: [InventoryService],
  controllers: [InventoryController],
})

export class InventoryModule {}
