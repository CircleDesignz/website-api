import { Module } from '@nestjs/common';
import { StockroomController } from '@controllers/stockroom/stockroom.controller';
import { ServicesModule } from '@services/services.module';

@Module({
  controllers: [StockroomController],
  imports: [ServicesModule]
})
export class StockroomModule {}
