import { Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryUnit } from './inventory-unit.entity';
import { RegisterUnitDto } from './dto/register-unit.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  // TODO: maybe convert return type from entity to dtos;
  @Get()
  getAllUnits(): Promise<InventoryUnit[]> {
    return this.inventoryService.getAllUnits();
  }

  @Post()
  async registerUnit(@Body() dto: RegisterUnitDto): Promise<InventoryUnit> {
    try {
      return this.inventoryService.registerUnit(dto);
    } catch (e) {
      throw e
    }
  }

  @Put()
  async updateArchiveState(@Body() dto: UpdateArchiveDto): Promise<void> {
    return this.inventoryService.setArchiveState(dto);
  }

  @Delete(':sku')
  async deleteUnit(@Param('sku') sku: string): Promise<void> {
    this.inventoryService.deleteUnit(sku);
  }
}

