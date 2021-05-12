import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { StockroomService } from '@services/stockroom/stockroom.service';
import { RegisterStockEntityDto } from './dto/register-stock.dto';
import { RegisterProductDto } from './dto/register-product.dto';
import { Product, StockEntity } from '@prisma/client';

@Controller('stockroom')
export class StockroomController {
  constructor(private readonly stockroomService: StockroomService) {}

  @Get()
  async getAll(): Promise<StockEntity[]> {
    return this.stockroomService.getAll();
  }

  @Get('/products')
  async getAllProducts(): Promise<Product[]> {
    return this.stockroomService.getAllProducts();
  }

  @Post()
  async registerPart(@Body() dto: RegisterStockEntityDto): Promise<StockEntity> {
    return this.stockroomService.registerPart(dto);
  }

  @Post('/product')
  async registerProduct(@Body() dto: RegisterProductDto): Promise<Product> {
    return this.stockroomService.registerProduct(dto);
  }

  @Post(':sku')
  async archiveStock(@Param() sku: string): Promise<StockEntity> {
    return this.stockroomService.archiveStock(sku);
  }
}
