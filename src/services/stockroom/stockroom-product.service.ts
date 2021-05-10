import { Injectable } from '@nestjs/common';
import { StockroomService } from './stockroom.service';
import { ProductService } from '@services/products/product.service'

@Injectable()
export class StockroomProductService {
  constructor(
    private readonly stockroomService: StockroomService,
    private readonly productService: ProductService
  ) {}
}
