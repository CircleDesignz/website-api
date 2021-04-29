import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Unit } from './entities/inventory-unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Unit)
    private inventoryRepository: Repository<Unit>,
  ) {}

  findAllUnits(): Promise<Unit[]> {
    return this.inventoryRepository.find();
  }

  async skuExists(sku: string): Promise<boolean> {
    return await this.inventoryRepository.count({ sku: sku }) !== 0;
  }

  createUnit(unit: CreateUnitDto): Promise<Unit> {
    const newUnit = new Unit();
    newUnit.sku = unit.sku;
    newUnit.name = unit.name;
    newUnit.unitCost = unit.unitCost;
    newUnit.unitPrice = unit.unitPrice;
    newUnit.currentStock = unit.currentStock;
    newUnit.weight = unit.weight;
    newUnit.associations = unit.associations;

    return this.inventoryRepository.save(newUnit);
  }

  deleteUnit(sku: string): Promise<DeleteResult> {
    return this.inventoryRepository.delete(sku);
  }
}

