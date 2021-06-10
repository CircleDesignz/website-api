import { IdentifiableEntity } from '@circle/src/common/entities/identifiable.entity';
import { ProductStatus } from '@circle/src/common/enums/product-status.enum';
import { IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Item } from '../../inventory/entities/item.entity';

@Entity()
export class Product extends IdentifiableEntity {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @OneToMany(() => Item, (item) => item.associatedProduct)
  variants: Item[];

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.STOPPED,
  })
  status: ProductStatus;

  @Column()
  salesPrice: number;
}
