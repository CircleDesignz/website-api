import { Module } from '@nestjs/common';
import { StockroomControllerController } from './stockroom-controller/stockroom-controller.controller';
import { StockroomController } from './stockroom/stockroom.controller';
import { StockroomService } from './stockroom/stockroom.service';

@Module({
  controllers: [StockroomControllerController, StockroomController],
  providers: [StockroomService]
})
export class StockroomModule {}
