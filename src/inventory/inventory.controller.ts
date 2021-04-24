import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Unit } from './entities/inventory-unit.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  findAll(): Promise<Unit[]> {
    return this.inventoryService.findAll();
  }

}

