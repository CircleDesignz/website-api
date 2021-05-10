import { Injectable } from '@nestjs/common';
import { OrderService } from '@services/orders/order.service';
import { StockroomService } from './stockroom.service';

@Injectable()
export class StockroomOrderService {
  constructor(
    private readonly stockroomService: StockroomService,
    private readonly orderService: OrderService
  ) {}


}
