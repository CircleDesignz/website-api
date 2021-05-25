import { Module } from '@nestjs/common';
import { ServicesModule } from '@services/services.module';

@Module({
  providers: [],
  imports: [ServicesModule],
})
export class CustomerModule {};
