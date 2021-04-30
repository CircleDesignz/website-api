import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Unit } from './inventory-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [InventoryService],
  controllers: [InventoryController],
})

export class InventoryModule {}
