import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockroomModule } from './stockroom/stockroom.module';

@Module({
  imports: [
    // TODO: dotenv for this
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fx',
      password: '162301',
      database: 'circle_inventory',
      entities: [],
      synchronize: true,
    }),
    StockroomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
