import { IdentifiableEntity } from '@circle/common/entities/identifiable.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from '../../catalog/entities/product.entity';

@Entity()
export class Item extends IdentifiableEntity {
  @Column({ unique: true })
  sku: string;

  @Column()
  descriptor: string;

  @Column()
  details?: string;

  @Column({ default: 0 })
  count: number;

  @Column({ default: 0})
  threshold: number;

  @ManyToOne(() => Product, (product) => product.variants, { nullable: true })
  associatedProduct?: Product

  @Column()
  isArchived: boolean;
};
// TODO: Categorization
