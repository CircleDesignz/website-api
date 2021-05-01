import { Controller,
  Get,
  Post,
  Put,
  Body,
  HttpException,
  HttpStatus,
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

  @Get()
  findAllUnits(): Promise<InventoryUnit[]> {
    return this.inventoryService.findAllUnits();
  }

  @Post()
  async registerUnit(@Body() dto: RegisterUnitDto): Promise<InventoryUnit> {
    try {
      return this.inventoryService.registerUnit(dto);
    } catch (e) {
      if (e instanceof UnitConflictError) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
    }
  }

  @Put()
  async updateArchiveState(@Body() dto: UpdateArchiveDto): Promise<InventoryUnit> {
    try {
      return this.inventoryService.setArchiveState(dto);
    } catch (e) {
      if (e instanceof UnitNotFoundError) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Delete(':sku')
  async deleteUnit(@Param('sku') sku: string): Promise<void> {
    try {
      await this.inventoryService.deleteUnit(sku);
    } catch (e) {
      if (e instanceof UnitNotFoundError) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      } else if (e instanceof OrderConflictError) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
    }
  }
}

