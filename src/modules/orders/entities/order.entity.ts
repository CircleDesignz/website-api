import { IdentifiableEntity } from '@circle/common/entities/identifiable.entity';
import { OrderStatus } from '@circle/common/enums/order-status.enum';
import { PaymentStatus } from '@circle/common/enums/payment-status.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';

@Entity()
export class Order extends IdentifiableEntity {
  @Column({ generated: 'increment' })
  reference: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OPEN,
  })
  orderStatus: OrderStatus;

  @Column({ type: 'jsonb', array: false, default: () => "'[]'" })
  items: Array<{ sku: string; count: number }>; // TODO: maybe relation with Cart instance if we create cart module

  @Column({ nullable: true })
  total?: number;
}
