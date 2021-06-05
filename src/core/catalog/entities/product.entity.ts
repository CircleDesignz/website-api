import { ProductStatus } from 'src/common/enums/product-status.enum';
import { currencyTransformer } from 'src/common/utils/transformers';
import { InventoryUnit } from 'src/core/inventory/entities/inventory-unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => InventoryUnit)
  @JoinColumn()
  unit: InventoryUnit;

  @Column({ type: 'enum', enum: ProductStatus })
  status: ProductStatus;

  @Column({ type: 'integer', transformer: currencyTransformer })
  salesPrice: Dinero.Dinero;

}
