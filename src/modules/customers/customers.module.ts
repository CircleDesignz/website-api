import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';

@Module({
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
