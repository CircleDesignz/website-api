import { InventoryUnit } from '@common/entities/inventory/inventory-unit.entity';
import { Product } from '@common/entities/inventory/product.entity';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RegisterProductDto } from './dto/register-product.dto';
import { RegisterUnitDto } from './dto/register-unit.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(
    private inventoryService: InventoryService
  ) {}

  @Get('/ping')
  async ping(): Promise<string> {
    return "Hello :)"
  }

  @Get()
  async listAllUnits(): Promise<InventoryUnit[]> {
    return this.inventoryService.listAllUnits();
  }

  @Post()
  async registerUnit(@Body() dto: RegisterUnitDto): Promise<InventoryUnit> {
    return this.inventoryService.registerUnit(dto);
  }

  @Post('/catalog')
  async registerProduct(@Body() dto: RegisterProductDto): Promise<Product> {
    return this.inventoryService.registerProduct(dto);
  }
}
