import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FulfillStatus } from '../common/data/fulfill-stats.data';
import { PaymentStatus } from '../common/data/payment-status.data';
import { Order} from './order.entity';
import { RegisterOrderDto } from './dto/register-order.dto';
import { CustomersService } from 'src/customers/customers.service';
import { OrderBuilder } from './builders/order.builder';


@Injectable()
export class OrdersService {
  constructor(
    @Inject(CustomersService)
    private readonly customersService: CustomersService,
    @Inject(OrderBuilder)
    private readonly orderBuilder: OrderBuilder,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  ordersContainsSku(sku: string): Promise<boolean> {
    // SELECT EXISTS(SELECT 1 FROM ORDER WHERE sku IN(ITEMS))
    const query = this.ordersRepository.createQueryBuilder()
      .select('1')
      .from(Order, 'order')
      .where(`${sku} IN(order.items)`);
    return this.ordersRepository.query(`SELECT EXISTS(${query}) AS "exists"`);

  }

  findAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findById(id: string): Promise<Order[]> {
    return this.ordersRepository.findByIds([id]);
  }

  async registerOrder(dto: RegisterOrderDto): Promise<Order> {
    // TODO: use factory for this.
    const newUnit = await this.orderBuilder.buildFromtDto(dto);
    return this.ordersRepository.save(newUnit);
  }
}
