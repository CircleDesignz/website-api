import { Module } from '@nestjs/common';
import { StockroomController } from '@controllers/stockroom/stockroom.controller';
import { StockroomService } from '@services/stockroom/stockroom.service';
import { PrismaService } from '@services/persistence/prisma.service';

@Module({
  controllers: [StockroomController],
  providers: [StockroomService, PrismaService]
})
export class StockroomModule {}
