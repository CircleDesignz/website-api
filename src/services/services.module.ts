import { Module } from '@nestjs/common';
import { StockroomService } from './stockroom/stockroom.service';
import { PrismaService } from './persistence/prisma.service';
import { OrderService } from './orders/order.service';

@Module({
  providers: [
    StockroomService,
    PrismaService,
    OrderService,
  ],
  exports: [
    StockroomService,
    PrismaService,
    OrderService,
  ],
})
export class ServicesModule {}
