import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class InventoryUnit {
  @PrimaryColumn()
  sku: string;

  @Column()
  name: string;

  @Column({ type: "numeric" })
  costInCad: number;

  @Column({ type: "numeric" })
  priceInCad: number;

  @Column({ type: "integer" })
  currentStock: number;

  @Column({ type: "double precision" })
  weightInKg: number;

  @Column({ type: "boolean" })
  isArchived: boolean;
}
