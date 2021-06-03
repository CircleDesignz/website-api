import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { InventoryUnit } from '../entities/inventory-unit.entity';

@EntityRepository(InventoryUnit)
export class InventoryRepository extends Repository<InventoryUnit> {
  async exists(query: SelectQueryBuilder<InventoryUnit>): Promise<boolean> {
    return (
      await this.query(`SELECT EXISTS(${query.getQuery()}) AS "exists"`)
    )[0].exists;
  }
}
