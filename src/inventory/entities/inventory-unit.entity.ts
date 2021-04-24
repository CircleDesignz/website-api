import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Unit {
  @PrimaryColumn()
  sku: string;

  @Column()
  name: string;

  @Column({ type: "money" })
  unitCost: number;

  @Column({ type: "money" })
  unitPrice: number;

  @Column({ type: "integer" })
  currentStock: number;

  @Column({ type: "double precision" })
  weight: number;

  @Column('simple-array')
  associations: string[];
}
