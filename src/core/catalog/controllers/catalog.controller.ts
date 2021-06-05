import { Body, Controller, Post } from '@nestjs/common';
import { RegisterProductDto } from '../dto/register-product.dto';
import { CatalogService } from '../services/catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  async registerProduct(@Body() dto: RegisterProductDto): Promise<void> {
    this.catalogService.registerProduct(dto);
  }
}
