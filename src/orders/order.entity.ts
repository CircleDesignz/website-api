import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { InventoryUnit } from '../inventory/inventory-unit.entity';
import { Customer } from '../customers/customer.entity';
import { Currency } from '../common/data/currency.data';
import { FulfillStatus } from '../common/data/fulfill-stats.data';
import { PaymentStatus } from '../common/data/payment-status.data';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "timestamptz" })
  dateCreated: Date;

  @Column({ type: "timestamptz", nullable: true })
  dateFulfilled?: Date;

  @Column()
  currency: Currency;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

  @Column('simple-array')
  items: InventoryUnit[]

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: "enum",
    enum: FulfillStatus,
    default: FulfillStatus.PENDING
  })
  fulfillStatus: FulfillStatus;
}

// TODO: Entity logic for refunds

