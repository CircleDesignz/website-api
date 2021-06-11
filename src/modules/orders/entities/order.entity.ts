import { IdentifiableEntity } from '@circle/src/common/entities/identifiable.entity';
import { OrderStatus } from '@circle/src/common/enums/order-status.enum';
import { PaymentStatus } from '@circle/src/common/enums/payment-status.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class Order extends IdentifiableEntity {
  @Column({ generated: 'increment' })
  reference: number;

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

  @Column()
  total: number;

}
// TODO: Relation for customer
// TODO: Relation for items in cart
