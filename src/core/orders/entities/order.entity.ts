import { Product } from 'src/core/inventory/entities/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../../../common/entities/customers/customer.entity';

export enum PaymentStatus {
  AUTHORIZED = 'authorized',
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
  VOIDED = 'voided',
}

export enum OrderStatus {
  OPEN = 'open',
  FULFILLED = 'fulfilled',
  SCHEDULED = 'scheduled',
  ARCHIVED = 'archived',
  CANCELLED = 'cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dateCreated: Date;

  @Column()
  lastChange: Date;

  @Column()
  dateFulfilled?: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @ManyToMany(() => Product)
  @JoinTable()
  items: Product[];

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN })
  orderStatus: OrderStatus;
}
