import { InventoryUnit } from '@common/entities/inventory/inventory-unit.entity';
import { Product } from '@common/entities/inventory/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryUnitFactory } from './factory/inventory-unit.factory';
import { ProductFactory } from './factory/product.factory';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryUnit, Product])],
  providers: [InventoryService, InventoryUnitFactory, ProductFactory],
  controllers: [InventoryController],
})
export class InventoryModule {}
