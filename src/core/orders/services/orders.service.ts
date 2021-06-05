import { Injectable } from '@nestjs/common';
import { CatalogService } from 'src/core/catalog/services/catalog.service';
import { CustomersService } from 'src/core/customers/services/customers.service';
import { RegisterOrderDto } from '../dto/register-order.dto';
import { Order } from '../entities/order.entity';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly _ordersRepository: OrdersRepository,
    private readonly _customersService: CustomersService,
    private readonly _catalogService: CatalogService
  ) {}

  async hasOutstandingOrders(): Promise<boolean> {
    const query = this._ordersRepository
      .createQueryBuilder()
      .select('1')
      .from(Order, 'orders');
    return await this._ordersRepository.exists(query);
  }

  async registerOrder(dto: RegisterOrderDto): Promise<Order> {
    const order = new Order();
    const ts = new Date();
    const customer = await this._customersService.getById(dto.customerId);
    const items = await this._catalogService.findProductsById(dto.itemIds);

    order.customer = customer;
    order.dateCreated = ts;
    order.lastChange = ts;
    order.paymentStatus = dto.paymentStatus;
    order.items = items;

    return this._ordersRepository.save(order);
  }
}
