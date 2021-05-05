import { Entity, Column, PrimaryColumn } from 'typeorm';
import Dinero from 'dinero.js';

@Entity()
export class InventoryEntity {
  @PrimaryColumn()
  sku: string;

  @Column()
  name: string;

  @Column({
    type: "int",
    transformer: {
      to: (object: Dinero.Dinero) => object.getAmount(),
      from: (value: number) => Dinero({ amount: value, currency: "CAD" })
    }
  })
  costInCad: Dinero.Dinero;

  @Column({
    type: "int",
    transformer: {
      to: (value: Dinero.Dinero) => value.getAmount(),
      from: (value: number) => Dinero({ amount: value, currency: "CAD" })
    }
  })
  priceInCad: Dinero.Dinero;

  @Column({ type: "integer" })
  stock: number;

  @Column({ type: "double precision" })
  weightInKg: number;

  @Column({ type: "boolean" })
  isArchived: boolean;
}
