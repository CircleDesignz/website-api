import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './modules/catalog/catalog.module';
import { CustomersModule } from './modules/customers/customers.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    InventoryModule,
    CatalogModule,
    OrdersModule,
    CustomersModule,
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // TODO: Set false for production
    }),
    EventEmitterModule.forRoot({
      verboseMemoryLeak: true,
    }),
  ],
})
export class AppModule {}
