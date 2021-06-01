import { InventoryUnit } from '@common/entities/inventory/inventory-unit.entity';
import { Product } from '@common/entities/inventory/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Repository } from 'typeorm';
import { RegisterUnitDto } from './dto/register-unit.dto';
import { UnitRegisteredEvent } from './events/unit-registered.event';
import { ProductRegisteredEvent } from './events/product-registered.event';
import { RegisterProductDto } from './dto/register-product.dto';
import { InventoryUnitFactory } from './factory/inventory-unit.factory';
import { ProductFactory } from './factory/product.factory';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryUnit)
    private readonly inventoryRepo: Repository<InventoryUnit>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly eventEmitter: EventEmitter2,
    private readonly unitFactory: InventoryUnitFactory,
    private readonly prodFactory: ProductFactory
  ) {}

  async listAllUnits(): Promise<InventoryUnit[]> {
    return this.inventoryRepo.find();
  }

  async registerUnit(dto: RegisterUnitDto): Promise<InventoryUnit> {
    if (await this._SkuExists(dto.sku)) {
      throw new Error(`A unit with SKU [${dto.sku}] already exists`);
    }

    const unit = this.unitFactory.dtoToUnit(dto);

    await this.inventoryRepo.save(unit);

    this.eventEmitter.emit('inventory-unit.created', new UnitRegisteredEvent());

    return unit;
  }

  async registerProduct(dto: RegisterProductDto): Promise<Product> {
    if (await this._SkuExists(dto.sku)) {
      throw new Error(`A unit with SKU [${dto.sku}] already exists`);
    }

    const product = this.prodFactory.dtoToProduct(dto);

    await this.productRepo.save(product);

    this.eventEmitter.emit('product.created', new ProductRegisteredEvent());

    return product;
  }

  private async _SkuExists(sku: string): Promise<boolean> {
    const unit = await this.inventoryRepo.findOne({ sku });
    return unit !== undefined;
  }
}
