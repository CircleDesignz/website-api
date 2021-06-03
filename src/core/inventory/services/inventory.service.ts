import { HttpException, Injectable } from '@nestjs/common';
import { OrdersService } from 'src/core/orders/services/orders.service';
import { RegisterUnitDto } from '../dto/register-unit.dto';
import { InventoryUnit } from '../entities/inventory-unit.entity';
import { InventoryRepository } from '../repositories/inventory.repository';

@Injectable()
export class InventoryService {
  constructor(
    private readonly _inventoryRepository: InventoryRepository,
    private readonly _ordersService: OrdersService
  ) {}

  async registerUnit(dto: RegisterUnitDto): Promise<InventoryUnit> {
    if (await this._unitExists(dto.sku)) {
      throw new HttpException({}, 404); // TODO error handling
    }

    // TODO maybe create mapper class
    // Map dto
    const unit = new InventoryUnit();
    const ts = new Date();
    unit.sku = dto.sku;
    unit.descriptor = dto.descriptor;
    unit.count = dto.count;
    unit.dateCreated = ts;
    unit.lastUpdated = ts;

    return this._inventoryRepository.save(unit); // TODO: return dto
  }

  async archiveUnit(sku: string): Promise<void> {
    if (!(await this._unitExists(sku))) {
      throw new HttpException({}, 404);
    }

    if (await this._ordersService.hasOutstandingOrders()) {
      throw new HttpException({}, 404);
    }

    this._inventoryRepository.update({ sku }, { isArchived: true });
  }

  async _unitExists(sku: string): Promise<boolean> {
    const query = this._inventoryRepository
      .createQueryBuilder()
      .select('1')
      .from(InventoryUnit, 'unit')
      .where(`unit.sku = '${sku}'`);
    return this._inventoryRepository.exists(query);
  }
}
