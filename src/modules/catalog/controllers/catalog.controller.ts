import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterProductDto } from '../dto/register-product.dto';
import { Product } from '../entities/product.entity';
import { CatalogService } from '../services/catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly _catalogService: CatalogService) {}

  @Get('/test')
  async getAllRaw(): Promise<Product[]> {
    return this._catalogService.getAllRaw();
  }

  @Post()
  async registerProduct(@Body() dto: RegisterProductDto): Promise<Product> {
    return this._catalogService.registerProduct(dto);
  }
}
