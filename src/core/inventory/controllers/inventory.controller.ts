import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RegisterUnitDto } from '../dto/register-unit.dto';
import { InventoryUnit } from '../entities/inventory-unit.entity';
import { InventoryService } from '../services/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly _inventoryService: InventoryService) {}

  @Post()
  async registerUnit(@Body() dto: RegisterUnitDto): Promise<InventoryUnit> {
    return this._inventoryService.registerUnit(dto);
  }

  @Patch(':sku')
  async(@Param('sku') sku: string): Promise<void> {
    return this._inventoryService.archiveUnit(sku);
  }
}
