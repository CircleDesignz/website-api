import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersRepository])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
