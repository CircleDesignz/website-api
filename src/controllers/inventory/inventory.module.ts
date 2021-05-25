import { Module } from '@nestjs/common';
import { InventoryController } from '@controllers/inventory/inventory.controller';
import { ServicesModule } from '@services/services.module';

@Module({
  controllers: [InventoryController],
  imports: [ServicesModule],
})
export class StockroomModule {}
