import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { InventoryUnit } from '../inventory/inventory-unit.entity';
import { Customer } from '../customers/customer.entity';

export enum FulfillStatus {
  OPEN,
  PENDING,
  FULFILLED,
  CANCELLED,
  ARCHIVED
}

export enum PaymentStatus {
  AUTHORIZED,
  PAID,
}

export enum Currency {
  CAN,
  USD,
  EUR,
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "timestamptz" })
  dateCreated: Date;

  @Column({ type: "timestamptz" })
  dateFulfilled?: Date;

  @Column()
  currency: Currency;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

  @Column('simple-array')
  items: InventoryUnit[]
}

// TODO: Entity logic for refunds

