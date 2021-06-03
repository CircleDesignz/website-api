import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
