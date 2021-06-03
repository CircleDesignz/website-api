import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from '../entities/order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async exists(query: SelectQueryBuilder<Order>): Promise<boolean> {
    return (
      await this.query(`SELECT EXISTS(${query.getQuery()}) AS "exists"`)
    )[0].exists;
  }
}
