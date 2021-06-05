import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './controllers/customers.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersRepository])],
  exports: [CustomersService],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
