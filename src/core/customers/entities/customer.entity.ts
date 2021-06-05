import { currencyTransformer } from 'src/common/utils/transformers';
import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import Dinero from 'dinero.js';

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

  @Column({ type: 'integer', transformer: currencyTransformer })
  totalSpent: Dinero.Dinero;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @Column((type) => Address)
  address: Address;
}
