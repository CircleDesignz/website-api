import { Body, Controller, Post } from "@nestjs/common";
import { RegisterCustomerDto } from "../dto/register-customer.dto";
import { Customer } from "../entities/customer.entity";
import { CustomersService } from "../services/customers.service";

@Controller('customers')
export class CustomersController {
  constructor(private readonly _customersService: CustomersService) {}

  @Post()
  async registerCustomer(@Body() dto: RegisterCustomerDto): Promise<Customer> {
    return this._customersService.registerCustomer(dto);
  }
}