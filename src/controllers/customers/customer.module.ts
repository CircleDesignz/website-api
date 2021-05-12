import { Module } from '@nestjs/common';
import { CustomerService } from '@services/customer/customer.service';
import { ServicesModule } from '@services/services.module';

@Module({
  providers: [CustomerService],
  imports: [ServicesModule],
})
export class CustomerModule {};
