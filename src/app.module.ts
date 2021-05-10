import { Module } from '@nestjs/common';
import { StockroomModule } from '@controllers/stockroom/stockroom.module';
import { ServicesModule } from '@services/services.module';
import { ProductModule } from '@controllers/products/product.module';

@Module({
  imports: [
    StockroomModule,
    ProductModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
