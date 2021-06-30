import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { CustomersModule } from './modules/customers/customers.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    CatalogModule,
    CheckoutModule,
    CustomersModule,
    InventoryModule,
    OrdersModule,
    PaymentModule,
    SessionsModule,
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true, // TODO: Set false for production
      }),
      inject: [ConfigService]
    }),
    EventEmitterModule.forRoot({
      verboseMemoryLeak: true,
    }),
  ],
})
export class AppModule {}
