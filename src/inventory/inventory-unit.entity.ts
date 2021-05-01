import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class InventoryUnit {
  public constructor(init?:Partial<InventoryUnit>) {
    Object.assign(this, init);
  }

  @PrimaryColumn()
  sku: string;

  @Column()
  name: string;

  // TODO: Maybe convert to "numeric" type, see https://wiki.postgresql.org/wiki/Don%27t_Do_This#Don.27t_use_money
  @Column({ type: "money" })
  unitCost: number;

  @Column({ type: "money" })
  unitPrice: number;

  @Column({ type: "integer" })
  currentStock: number;

  @Column({ type: "double precision" })
  weight: number;

  @Column({ type: "boolean" })
  isArchived: boolean;
}
