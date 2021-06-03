import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CoreModule } from './core/core.module';
import { InventoryUnit } from './core/inventory/entities/inventory-unit.entity';
import { Order } from './core/orders/entities/order.entity';

const entities = [InventoryUnit, Order];

@Module({
  imports: [
    // TODO: move to .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'circle_main',
      username: 'fx',
      password: '162301',
      entities,
      synchronize: true, // TODO: Set false for production
    }),
    EventEmitterModule.forRoot(),
    CoreModule,
  ],
})
export class AppModule {}
