import { IdentifiableEntity } from '@circle/src/common/entities/identifiable.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Customer extends IdentifiableEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone?: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
// TODO: Add shipping info
// TODO: Categorization
// TODO: Event sourcing
