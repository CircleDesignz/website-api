import { ProductStatus } from '@circle/common/enums/product-status.enum';
import { Injectable } from '@nestjs/common';
import { InvokeSaleDto } from '../dto/invoke-sale.dto';
import { RegisterProductDto } from '../dto/register-product.dto';
import { UpdateProductDetailsDto } from '../dto/update-details.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class CatalogService {
  constructor(private readonly _productRepository: ProductRepository) {}

  async _getAllRaw(): Promise<Product[]> {
    return this._productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'variants')
      .getMany();
  }

  async registerProduct(dto: RegisterProductDto): Promise<Product> {
    const { variantUuids } = dto;

    // TODO: validate variants exist
    const variants = variantUuids.map((uuid) => {
      return { id: uuid };
    });

    let product = this._productRepository.create({
      variants,
      ...dto,
    });

    return this._productRepository.save(product);
  }

  async updateProductStatus(id: string, newStatus: ProductStatus) {
    this._productRepository.update(id, { status: newStatus });
  }

  async updateDetails(id: string, dto: UpdateProductDetailsDto): Promise<void> {
    this._productRepository.update(id, { ...dto });
  }

  async addVariantsToProduct(
    productId: string,
    variantIds: string[]
  ): Promise<void> {
    await this._productRepository
      .createQueryBuilder()
      .relation(Product, 'variants')
      .of(productId)
      .add(variantIds);
  }

  async invokeSale(productId: string, dto: InvokeSaleDto): Promise<any> {
  }
}
