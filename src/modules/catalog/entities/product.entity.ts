import { IdentifiableEntity } from '@circle/common/entities/identifiable.entity';
import { ProductStatus } from '@circle/common/enums/product-status.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { Item } from '../../inventory/entities/item.entity';

@Entity()
export class Product extends IdentifiableEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image?: string;

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
