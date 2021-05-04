import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Dinero } from 'dinero.js';

@Entity()
export class InventoryUnit {
  @PrimaryColumn()
  sku: string;

  @Column()
  name: string;

  @Column({ type: "money" })
  costInCad: Dinero;

  @Column({ type: "money" })
  priceInCad: Dinero;

  @Column({ type: "integer" })
  stock: number;

  @Column({ type: "double precision" })
  weightInKg: number;

  @Column({ type: "boolean" })
  isArchived: boolean;
}
