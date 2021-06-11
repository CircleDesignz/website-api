import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './controllers/inventory.controller';
import { ItemRepository } from './repositories/item.repository';
import { InventoryService } from './services/inventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository])],
  exports: [InventoryService],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
