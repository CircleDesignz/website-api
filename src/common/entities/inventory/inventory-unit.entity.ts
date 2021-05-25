import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InventoryUnit {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  descriptor: string;

  @Column()
  count: number;

  @Column()
  incoming?: number;

  @Column({ type: 'timestamptz'})
  dateCreated: Date;

  @Column({ type: 'timestamptz'})
  lastUpdated: Date;

  @Column()
  isArchived: boolean;
}
