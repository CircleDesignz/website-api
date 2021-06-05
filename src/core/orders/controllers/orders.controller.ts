import { Body, Controller, Post } from '@nestjs/common';
import { RegisterOrderDto } from '../dto/register-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly _ordersService: OrdersService) {}

  @Post()
  async registerOrder(@Body() dto: RegisterOrderDto): Promise<void> {
    return this._ordersService.registerOrder(dto);
  }
}
