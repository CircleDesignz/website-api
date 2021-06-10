import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Item } from '../entities/item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async exists(query: SelectQueryBuilder<Item>): Promise<boolean> {
    return (
      await this.query(`SELECT EXISTS(${query.getQuery()}) AS "exists"`)
    )[0].exists;
  }
}
