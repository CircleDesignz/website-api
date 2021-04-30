import { Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryUnit } from './inventory-unit.entity';
import { CreateUnitDto } from './create-unit.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  findAllUnits(): Promise<InventoryUnit[]> {
    return this.inventoryService.findAllUnits();
  }

  @Post()
  async createUnit(@Body() unit: CreateUnitDto): Promise<InventoryUnit> {
    if (await this.inventoryService.skuExists(unit.sku)) {
      throw new HttpException('SKU already exists', HttpStatus.CONFLICT);
    }
    return this.inventoryService.createUnit(unit);
  }

  @Delete(':sku')
  async deleteUnit(@Param('sku') sku: string): Promise<void> {
    // TODO: Deleting "Product" inventory should check that no orders are currently being fulfilled for that unit
    const result = await this.inventoryService.deleteUnit(sku);
    if (result.affected === 0) {
      throw new HttpException('Unit with SKU does not exist', HttpStatus.NOT_FOUND);
    }
  }
}

