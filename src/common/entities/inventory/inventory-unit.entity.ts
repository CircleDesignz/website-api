import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class InventoryUnit {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  descriptor: string;

  @Column({ default: 0 })
  count: number;

  @Column({ nullable: true })
  incoming?: number;

  @Column({ type: 'timestamptz' })
  dateCreated: Date; // TODO: make this a Date maybe

  @Column({ type: 'timestamptz' })
  lastUpdated: Date;

  @Column({ default: false })
  isArchived: boolean;
}
