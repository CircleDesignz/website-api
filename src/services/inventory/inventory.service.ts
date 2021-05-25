import { InventoryUnit } from '@common/entities/inventory/inventory-unit.entity';
import { Product } from '@common/entities/inventory/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryUnit)
    private inventoryUnitRepository: Repository<InventoryUnit>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}
}
