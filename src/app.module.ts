import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockroomModule } from '@controllers/stockroom/stockroom.module';
import { ServicesModule } from '@services/services.module';

@Module({
  imports: [
    StockroomModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
