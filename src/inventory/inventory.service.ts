import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { InventoryUnit } from './inventory-unit.entity';
import { RegisterUnitDto } from './dto/register-unit.dto';
import { OrdersService } from '../orders/orders.service';
import { UpdateArchiveDto } from './dto/update-archive.dto';
import { UnitConflictError, UnitNotFoundError, OrderConflictError, UnitNotArchivedError } from '../common/exceptions/inventory';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(OrdersService)
    private readonly ordersService: OrdersService,
    @InjectRepository(InventoryUnit)
    private inventoryRepository: Repository<InventoryUnit>,
  ) {}

  async skuExists(sku: string): Promise<boolean> {
    return (await this.inventoryRepository.count({ sku: sku })) !== 0;
  }

  async isArchived(sku: string): Promise<boolean> {
    return (await this.inventoryRepository.findOne(sku)).isArchived;
  }

  findAllUnits(): Promise<InventoryUnit[]> {
    return this.inventoryRepository.find();
  }

  findOne(sku: string): Promise<InventoryUnit> {
    return this.inventoryRepository.findOne(sku);
  }

  async registerUnit(dto: RegisterUnitDto): Promise<InventoryUnit> {
    if (await this.skuExists(dto.sku)) {
      throw new UnitConflictError('Unit with sku already exists');
    }
    const newUnit = new InventoryUnit();
    newUnit.sku = dto.sku;
    newUnit.name = dto.name;
    newUnit.costInCad = dto.costInCad;
    newUnit.priceInCad = dto.priceInCad;
    newUnit.currentStock = dto.stock;
    newUnit.weightInKg = dto.weightInKg;
    newUnit.isArchived = false;
    return this.inventoryRepository.save(newUnit);
  }

  async setArchiveState(dto: UpdateArchiveDto): Promise<void> {
    if (!(await this.skuExists(dto.sku))) {
      throw new UnitNotFoundError('Unit with SKU does not exist');
    }
    this.inventoryRepository.update(dto.sku, { isArchived: dto.newArchiveState });
  }

  async deleteUnit(sku: string): Promise<void> {
    // TODO: Should only be able to delete archived units.
    if (!(await this.skuExists(sku))) {
      throw new UnitNotFoundError('Unit with SKU does not exist');
    } else if (!(await this.ordersService.ordersContainsSku(sku))) {
      throw new OrderConflictError('Order for product exists'); //TODO: test if this works after orders is implemented
    } else if (!(await this.isArchived(sku))) {
      throw new UnitNotArchivedError('Cannot delete unit that is not archived');
    }
      console.log('executed 2')
    this.inventoryRepository.delete({ sku: sku });
  }
}

