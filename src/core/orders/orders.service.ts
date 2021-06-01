import { Order } from '@common/entities/orders/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>
  ) {}

  async outstandingOrdersExist(): Promise<boolean> {
    const orders = await this.ordersRepo.find();
    return orders.length !== 0;
  }

  async orderExists(id: string): Promise<boolean> {
    const order = await this.ordersRepo.findOne({ id });
    return order !== undefined;
  }
}
