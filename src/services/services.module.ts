import { Module } from '@nestjs/common';
import { StockroomService } from './inventory/inventory.service';

@Module({
  providers: [StockroomService],
  exports: [StockroomService],
})
export class ServicesModule {}
