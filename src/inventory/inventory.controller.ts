import { Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryEntity } from './inventory-unit.entity';
import { RegisterUnitDto } from './dto/register-unit.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  // TODO: maybe convert return type from entity to dtos;
  @Get()
  listAllUnits(): Promise<InventoryEntity[]> {
    return this.inventoryService.listAllUnits();
  }

  @Post()
  async registerUnit(@Body() dto: RegisterUnitDto): Promise<InventoryEntity> {
    return this.inventoryService.registerUnit(dto);
  }

  @Put()
  async updateArchiveState(@Body() dto: UpdateArchiveDto): Promise<InventoryEntity> {
    return this.inventoryService.updateArchiveState(dto);
  }

  @Delete(':sku')
  async deleteUnit(@Param('sku') sku: string): Promise<void> {
    await this.inventoryService.deleteUnit(sku);
  }
}

