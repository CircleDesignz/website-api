import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import Dinero from 'dinero.js';

import { OrderEntity } from '../orders/order.entity';
import { RegisterUnitDto } from './dto/register-unit.dto';
import { InventoryEntity } from './inventory-unit.entity';
import { UpdateArchiveDto as UpdateArchiveStateDto } from './dto/update-archive.dto';
import { InventoryErrors } from 'src/common/errors/inventory/inventory.errors';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async listAllUnits(): Promise<InventoryEntity[]> {
    return this.inventoryRepository.find();
  }

  async registerUnit(dto: RegisterUnitDto): Promise<InventoryEntity> {
    if (await this.inventoryRepository.findOne(dto.sku)) {
      throw new ConflictException(InventoryErrors.UnitConflict);
    }

    const unit = new InventoryEntity();

    unit.sku = dto.sku;
    unit.name = dto.name;
    unit.costInCad = Dinero({ amount: dto.costInCad * 100 });
    unit.priceInCad = Dinero({ amount: dto.priceInCad * 100 });
    unit.stock = dto.stock;
    unit.weightInKg = dto.weightInKg;
    unit.isArchived = false;

    return this.inventoryRepository.save(unit);
  }

  async updateArchiveState(
    dto: UpdateArchiveStateDto
  ): Promise<InventoryEntity> {
    const unit = await this.inventoryRepository.findOne(dto.sku);

    if (!unit) {
      throw new NotFoundException(InventoryErrors.NotFound);
    }

    // TODO: Check orders

    unit.isArchived = dto.isArchived;
    return this.inventoryRepository.save(unit);
  }

  async deleteUnit(sku: string): Promise<void> {
    const unit = await this.inventoryRepository.findOne(sku);

    if (!unit) {
      throw new NotFoundException(InventoryErrors.NotFound);
    } else if (!unit.isArchived) {
      throw new NotFoundException(InventoryErrors.NotArchived);
    }

    await this.inventoryRepository.delete(unit);
  }
}
