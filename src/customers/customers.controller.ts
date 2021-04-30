import { Controller,
} from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('inventory')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

}
