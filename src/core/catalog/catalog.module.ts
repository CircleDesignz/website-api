import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from '../inventory/inventory.module';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogRepository } from './repositories/catalog.repository';
import { CatalogService } from './services/catalog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogRepository]),
    forwardRef(() => InventoryModule),
  ],
  exports: [CatalogService],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
