import { ProductStatus } from 'src/common/enums/product-status.enum';
import { currencyTransformer } from 'src/common/utils/transformers';
import { InventoryUnit } from 'src/core/inventory/entities/inventory-unit.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
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

  @OneToOne(() => InventoryUnit)
  @JoinColumn()
  unit: InventoryUnit;
}
