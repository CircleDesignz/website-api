import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddVariantsToProductsDto } from '../dto/add-variants.dto';
import { RegisterProductDto } from '../dto/register-product.dto';
import { UpdateProductDetailsDto } from '../dto/update-details.dto';
import { Product } from '../entities/product.entity';
import { CatalogService } from '../services/catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly _catalogService: CatalogService) {}

  @Get('/test')
  async _getAllRawDebug(): Promise<Product[]> {
    return this._catalogService._getAllRaw();
  }

  @Post()
  async registerProduct(@Body() dto: RegisterProductDto): Promise<Product> {
    return this._catalogService.registerProduct(dto);
  }

  @Patch(':id/detail')
  async updateProductDetails(
    @Param() id: string,
    @Body() dto: UpdateProductDetailsDto
  ): Promise<void> {
    this._catalogService.updateDetails(id, dto);
  }

  @Patch('/:id/variant')
  async addVariantsToProduct(
    @Param() id: string,
    @Body() dto: AddVariantsToProductsDto
  ): Promise<void> {
    this._catalogService.addVariantsToProduct(id, dto.variantUuids);
  }
}
