import { Column, ChildEntity, Generated } from 'typeorm';
import { currencyTransformer } from '@common/utils/transformers';
import { InventoryUnit } from './inventory-unit.entity';

export enum ProductStatus {
  LIVE = 'live',
  PAUSED = 'paused',
  STOPPED = 'stopped',
}

@ChildEntity()
export class Product extends InventoryUnit {
  @Generated('uuid')
  prodId: string;

  @Column({ type: 'enum', enum: ProductStatus })
  status: ProductStatus;

  @Column({
    type: 'integer',
    transformer: currencyTransformer,
    nullable: true,
  }) // TODO: Numeric(2) -> Dinero might be wrong
  unitCost?: Dinero.Dinero;

  @Column({ type: 'integer', transformer: currencyTransformer })
  salePrice: Dinero.Dinero;
}
