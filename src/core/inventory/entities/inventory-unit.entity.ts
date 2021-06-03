import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
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
  dateCreated: Date;

  @Column({ type: 'timestamptz' })
  lastUpdated: Date;

  @Column({ default: false })
  isArchived: boolean;
}
