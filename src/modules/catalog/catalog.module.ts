import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from '../inventory/inventory.module';
import { CatalogController } from './controllers/catalog.controller';
import { ProductRepository } from './repositories/product.repository';
import { CatalogService } from './services/catalog.service';

@Module({
  imports: [
    InventoryModule,
    TypeOrmModule.forFeature([ProductRepository])
  ],
  providers: [CatalogService],
  controllers: [CatalogController]
})
export class CatalogModule {}
