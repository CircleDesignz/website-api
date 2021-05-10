import { Module } from '@nestjs/common';
import { ServicesModule } from '@services/services.module';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  imports: [ServicesModule]
})
export class ProductModule {}
