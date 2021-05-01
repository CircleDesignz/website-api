import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  findAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findById(id: string): Promise<Order[]> {
    return this.ordersRepository.findByIds([id]);
  }

}

