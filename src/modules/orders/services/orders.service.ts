import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterOrderDto } from '../dto/register-order.dto';
import { Order } from '../entities/order.entity';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly _ordersRepository: OrdersRepository) {}

  async listAllOrders(): Promise<Order> {
    return;
  }

  async registerOrder(dto: RegisterOrderDto): Promise<Order> {
    const order = this._ordersRepository.create();
    return this._ordersRepository.save(order);
  }
}
