import { Module } from '@nestjs/common';
import { StockroomService } from './stockroom/stockroom.service';
import { StockroomProductService } from './stockroom/stockroom-product.service';
import { StockroomOrderService } from './stockroom/stockroom-order.service';
import { PrismaService } from './persistence/prisma.service';
import { ProductService } from './products/product.service';
import { OrderService } from './orders/order.service';

@Module({
  providers: [
    StockroomService,
    StockroomProductService,
    StockroomOrderService,
    PrismaService,
    ProductService,
    OrderService,
  ],
  exports: [
    StockroomService,
    StockroomProductService,
    StockroomOrderService,
    PrismaService,
    ProductService,
    OrderService,
  ],
})
export class ServicesModule {}
