import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { InventoryUnit } from './inventory-unit.entity';
import { CreateUnitDto } from './create-unit.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryUnit)
    private inventoryRepository: Repository<InventoryUnit>,
  ) {}

  findAllUnits(): Promise<InventoryUnit[]> {
    return this.inventoryRepository.find();
  }

  async skuExists(sku: string): Promise<boolean> {
    return await this.inventoryRepository.count({ sku: sku }) !== 0;
  }

  createUnit(unit: CreateUnitDto): Promise<InventoryUnit> {
    const newUnit = new InventoryUnit();
    newUnit.sku = unit.sku;
    newUnit.name = unit.name;
    newUnit.unitCost = unit.unitCost;
    newUnit.unitPrice = unit.unitPrice;
    newUnit.currentStock = unit.currentStock;
    newUnit.weight = unit.weight;

    return this.inventoryRepository.save(newUnit);
  }

  deleteUnit(sku: string): Promise<DeleteResult> {
    return this.inventoryRepository.delete(sku);
  }
}

