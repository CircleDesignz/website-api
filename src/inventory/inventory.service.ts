import { ConflictException, ForbiddenException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryUnit } from './inventory-unit.entity';
import { RegisterUnitDto } from './dto/register-unit.dto';
import { OrdersService } from '../orders/orders.service';
import { UpdateArchiveDto } from './dto/update-archive.dto';
import Dinero from 'dinero.js';
import { InventoryErrors } from 'src/common/errors/inventory/inventory.errors';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(OrdersService)
    private readonly ordersService: OrdersService,
    @InjectRepository(InventoryUnit)
    private inventoryRepository: Repository<InventoryUnit>,
  ) {}

  async unitExists(sku: string): Promise<boolean> {
    return (await this.inventoryRepository.count({ sku: sku })) !== 0;
  }

  async isUnitArchived(sku: string): Promise<boolean> {
    return (await this.inventoryRepository.findOne(sku)).isArchived;
  }

  getAllUnits(): Promise<InventoryUnit[]> {
    return this.inventoryRepository.find();
  }

  findOne(sku: string): Promise<InventoryUnit> {
    return this.inventoryRepository.findOne(sku);
  }

  async registerUnit(dto: RegisterUnitDto): Promise<InventoryUnit> {
    if (await this.unitExists(dto.sku)) {
      throw new ConflictException(InventoryErrors.UnitConflict);
    }
    // TODO: Maybe abstract this to a builder
    const newUnit = new InventoryUnit();
    newUnit.sku = dto.sku;
    newUnit.name = dto.name;
    newUnit.costInCad = Dinero({ amount: dto.costInCad * 100 });
    newUnit.priceInCad = Dinero({ amount: dto.priceInCad * 100 });
    newUnit.stock = dto.stock;
    newUnit.weightInKg = dto.weightInKg;
    newUnit.isArchived = false;
    return this.inventoryRepository.save(newUnit);
  }

  async setArchiveState(dto: UpdateArchiveDto): Promise<void> {
    const { sku, newArchiveState } = dto;
    if (!(await this.unitExists(dto.sku)))
      throw new NotFoundException(InventoryErrors.NotFound);
    else if (!(await this.ordersService.ordersContainsSku(sku)))
      throw new ConflictException(InventoryErrors.OrderConflict);
    this.inventoryRepository.update(dto.sku, { isArchived: newArchiveState });
  }

  async deleteUnit(sku: string): Promise<void> {
    if (!(await this.unitExists(sku))) {
      throw new NotFoundException(InventoryErrors.NotFound);
    } else if (!(await this.isUnitArchived(sku))) {
      throw new PreconditionFailedException(InventoryErrors.OrderConflict);
    }
    this.inventoryRepository.delete({ sku: sku });
  }
}

