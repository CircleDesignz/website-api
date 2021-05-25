import { Entity, Column } from 'typeorm';
import { currencyTransformer } from '@common/utils/transformers';
import { InventoryUnit } from './inventory-unit.entity';

export enum ProductStatus {
  LIVE = 'live',
  PAUSED = 'paused',
  STOPPED = 'stopped',
}

@Entity()
export class Product {
  @Column(() => InventoryUnit)
  info: InventoryUnit;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.STOPPED })
  status: ProductStatus;

  @Column({ type: 'numeric', precision: 2, transformer: currencyTransformer }) // TODO: Numeric(2) -> Dinero might be wrong
  unit_cost?: Dinero.Dinero;

  @Column({ type: 'numeric', precision: 2, transformer: currencyTransformer })
  sale_price: Dinero.Dinero;
}
