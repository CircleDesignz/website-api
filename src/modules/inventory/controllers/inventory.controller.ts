import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterItemDto } from '../dto/register-item.dto';
import { Item } from '../entities/item.entity';
import { InventoryService } from '../services/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly _inventoryService: InventoryService) {}

  @Get()
  async listItems(): Promise<Item[]> {
    return this._inventoryService.listAllUnits();
  }

  @Post()
  async registerItem(@Body() dto: RegisterItemDto): Promise<Item> {
    return this._inventoryService.registerUnit(dto);
  }
}
