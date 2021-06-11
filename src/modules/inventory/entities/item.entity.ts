import { IdentifiableEntity } from '@circle/src/common/entities/identifiable.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from '../../catalog/entities/product.entity';

@Entity()
export class Item extends IdentifiableEntity {
  @Column({ unique: true })
  sku: string;

  @Column()
  descriptor: string;

  @Column({ default: 0 })
  count: number;

  @Column({ nullable: true })
  incoming?: number;

  @ManyToOne(() => Product, (product) => product.variants, { nullable: true })
  associatedProduct?: Product;
}
// TODO: Categorization
