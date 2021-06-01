import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

export class Address {
  street: string;
  code: string;
  state: string;
  country: string;
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ type: 'money' })
  totalSpent: number;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @Column((type) => Address)
  address: Address;
}
