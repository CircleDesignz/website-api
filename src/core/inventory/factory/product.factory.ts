import {
  Product,
  ProductStatus,
} from '@common/entities/inventory/product.entity';
import { RegisterProductDto } from '../dto/register-product.dto';
import Dinero from 'dinero.js';

export class ProductFactory {
  dtoToProduct(dto: RegisterProductDto): Product {
    const prod = new Product();
    const timestamp = new Date();

    prod.sku = dto.sku;
    prod.descriptor = dto.descriptor;
    prod.count = dto.initialCount;
    prod.dateCreated = timestamp;
    prod.lastUpdated = timestamp;
    prod.unitCost =
      dto.cost !== undefined
        ? Dinero({ amount: dto.cost, currency: 'CAD' })
        : null;
    prod.salePrice = Dinero({ amount: dto.price, currency: 'CAD' });
    prod.status = ProductStatus.STOPPED;

    return prod;
  }
}
