import { Injectable } from '@nestjs/common';
import { RegisterCustomerDto } from '../dto/register-customer.dto';
import { Customer } from '../entities/customer.entity';
import { CustomersRepository } from '../repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(private readonly _customersRepository: CustomersRepository) {}

  async getById(id: string): Promise<Customer> {
    return this._customersRepository.findOneOrFail({ id });
  }

  async registerCustomer(dto: RegisterCustomerDto): Promise<Customer> {
    const customer = new Customer();
    // TODO: Implement this
    return this._customersRepository.save(customer);
  }
}
