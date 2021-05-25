import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InventoryService } from '@services/inventory/inventory.service';

@Controller('stockroom')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
}
