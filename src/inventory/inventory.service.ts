import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { InventoryUnit } from './inventory-unit.entity';
import { RegisterUnitDto } from './dto/register-unit.dto';
import { OrdersService } from 'src/orders/orders.service';
import { UpdateArchiveDto } from './dto/update-archive.dto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(OrdersService)
    private readonly ordersService: OrdersService,
    @InjectRepository(InventoryUnit)
    private inventoryRepository: Repository<InventoryUnit>,
  ) {}

  findAllUnits(): Promise<InventoryUnit[]> {
    return this.inventoryRepository.find();
  }

  async skuExists(sku: string): Promise<boolean> {
    return await this.inventoryRepository.count({ sku: sku }) !== 0;
  }

  async registerUnit(unit: RegisterUnitDto): Promise<InventoryUnit> {
    if (await this.skuExists(unit.sku)) {
      throw new UnitConflictError('Unit with sku already exists');
    }
    const newUnit = new InventoryUnit({
      sku: unit.sku,
      name: unit.name,
      unitCost: unit.unitCost,
      unitPrice: unit.unitPrice,
      currentStock: unit.currentStock,
      weight: unit.weight,
      isArchived: false,
    });
    return this.inventoryRepository.save(newUnit);
  }

  async setArchiveState(dto: UpdateArchiveDto): Promise<InventoryUnit> {
    if (!(await this.skuExists(dto.sku))) {
      throw new UnitNotFoundError('Unit with SKU does not exist');
    }
    const unit = await this.inventoryRepository.findOne(dto.sku);
    unit.isArchived = dto.newArchiveState;
    return this.inventoryRepository.save(unit);
  }

  async deleteUnit(sku: string): Promise<DeleteResult> {
    // TODO: Should only be able to delete archived units.
    if (!(await this.skuExists(sku))) {
      throw new UnitNotFoundError('Unit with SKU does not exist');
    } else if ((await this.ordersService.findById(sku)).length > 0) {
      throw new OrderConflictError('Order for product exists');
    }
    return this.inventoryRepository.delete(sku);
  }
}

