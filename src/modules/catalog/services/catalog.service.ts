import { Injectable } from '@nestjs/common';
import { InventoryService } from '../../inventory/services/inventory.service';
import { RegisterProductDto } from '../dto/register-product.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class CatalogService {
  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly _inventoryService: InventoryService
  ) {}

  async getAllRaw(): Promise<Product[]> {
    return this._productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'variants')
      .getMany();
  }

  async registerProduct(dto: RegisterProductDto): Promise<Product> {
    const { variantUuids } = dto;

    // Retrieve variants
    const variants = await this._inventoryService.findManyByUuid(variantUuids);

    const product = this._productRepository.create({
      variants,
      ...dto,
    });

    return this._productRepository.save(product);
  }
}
