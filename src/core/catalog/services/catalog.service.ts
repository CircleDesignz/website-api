import { Injectable } from '@nestjs/common';
import { InventoryService } from 'src/core/inventory/services/inventory.service';
import { RegisterProductDto } from '../dto/register-product.dto';
import { Product } from '../entities/product.entity';
import { CatalogRepository } from '../repositories/catalog.repository';
import Dinero from 'dinero.js';
import { DEFAULT_CURRENCY } from 'src/common/constants/currency';

@Injectable()
export class CatalogService {
  constructor(
    private readonly _catalogRepository: CatalogRepository,
    private readonly _inventoryService: InventoryService
  ) {}

  async findProductsById(itemIds: string[]): Promise<Product[]> {
    return this._catalogRepository
      .createQueryBuilder('product')
      .where('product.id IN (:ids)', { ids: itemIds })
      .getMany();
  }

  async registerProduct(dto: RegisterProductDto): Promise<void> {
    const unit = await this._inventoryService.findBySku(dto.unitSku);

    const product = new Product();
    product.unit = unit;
    product.salesPrice = Dinero({
      amount: dto.salesPrice,
      currency: DEFAULT_CURRENCY,
    });

    this._catalogRepository.save(product);
  }
}
