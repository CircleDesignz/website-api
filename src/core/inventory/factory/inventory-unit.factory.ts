import { InventoryUnit } from '@common/entities/inventory/inventory-unit.entity';
import { Injectable } from '@nestjs/common';
import { RegisterUnitDto } from '../dto/register-unit.dto';

@Injectable()
export class InventoryUnitFactory {
  dtoToUnit(dto: RegisterUnitDto): InventoryUnit {
    const { sku, descriptor, initialCount } = dto;

    const unit = new InventoryUnit();
    const timestamp = new Date();
    unit.sku = sku;
    unit.descriptor = descriptor;
    unit.count = initialCount;
    unit.dateCreated = timestamp;
    unit.lastUpdated = timestamp;
    unit.isArchived = false;
    return unit;
  }
}
