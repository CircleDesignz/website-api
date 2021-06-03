import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly _ordersRepository: OrdersRepository) {}

  async hasOutstandingOrders(): Promise<boolean> {
    const query = this._ordersRepository
      .createQueryBuilder()
      .select('1')
      .from(Order, 'orders');
    return await this._ordersRepository.exists(query);
  }
}
