import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegisterItemDto } from '../dto/register-item.dto';
import { Item } from '../entities/item.entity';
import { InventoryService } from '../services/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly _inventoryService: InventoryService) {}

  @Get()
  async listItems(): Promise<Item[]> {
    // TODO: websocket for real time
    return this._inventoryService.listAllUnits();
  }

  @Post()
  async registerItem(@Body() dto: RegisterItemDto): Promise<Item> {
    return this._inventoryService.registerUnit(dto);
  }

  @Put(':id/archive')
  async archiveItem(@Param() id: string): Promise<void> {
    this._inventoryService.archive(id);
  }

  @Delete(':id/archive')
  async undoItemArchive(@Param() id: string): Promise<void> {
    this._inventoryService.undoArchive(id);
  }
}
