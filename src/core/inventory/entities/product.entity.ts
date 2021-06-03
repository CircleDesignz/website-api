import { currencyTransformer } from 'src/common/utils/transformers';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

export enum ProductStatus {
  LIVE = 'live',
  PAUSED = 'paused',
  STOPPED = 'stopped',
}

@Entity()
export class Product {
  @PrimaryColumn()
  _id: string;

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
