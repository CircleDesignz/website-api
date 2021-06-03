import { OrderStatus } from 'src/common/enums/order-status.enum';
import { PaymentStatus } from 'src/common/enums/payment-status.enum';
import { Product } from 'src/core/catalog/entities/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../../../common/entities/customers/customer.entity';

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

  //@ManyToOne(() => Customer, (customer) => customer.orders)
  //customer: Customer;

  //@ManyToMany(() => Product)
  //@JoinTable()
  //items: Product[];

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN })
  orderStatus: OrderStatus;
}
