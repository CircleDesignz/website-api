import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './inventory/entities/inventory-unit.entity';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  // TODO: dotenv for this
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fx',
      password: '162301',
      database: 'circle_inventory',
      entities: [Unit],
      synchronize: true,
    }),
    InventoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
