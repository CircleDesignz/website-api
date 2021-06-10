import { IdentifiableEntity } from '@circle/src/common/entities/identifiable.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../catalog/entities/product.entity';

@Entity()
export class Item extends IdentifiableEntity {
  @Column({ unique: true })
  sku: string;

  @Column()
  descriptor: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated: Date;

  @Column({ default: 0 })
  count: number;

  @Column({ nullable: true })
  incoming?: number;

  @ManyToOne(() => Product, (product) => product.variants, { nullable: true })
  associatedProduct?: Product;
}
