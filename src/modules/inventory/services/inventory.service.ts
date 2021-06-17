import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { RegisterItemDto } from '../dto/register-item.dto';
import { UpdateItemDetailsDto } from '../dto/update-details.dto';
import { Item } from '../entities/item.entity';
import { ItemRepository } from '../repositories/item.repository';

@Injectable()
export class InventoryService {
  constructor(private readonly _itemRepository: ItemRepository) {}

  async listAllUnits(): Promise<Item[]> {
    return this._itemRepository.find();
  }

  async registerUnit(dto: RegisterItemDto): Promise<Item> {
    if (await this._keyExists('sku', dto.sku)) {
      throw new Error(
        `An item with sku ${dto.sku} already exists`
      );
    }

    const item = this._itemRepository.create({
      ...dto,
    });

    return this._itemRepository.save(item);
  }

  async updateDetails(id: string, dto: UpdateItemDetailsDto): Promise<UpdateResult> {
    return this._itemRepository.update({ id }, dto);
  }

  async updateThreshold(id: string, newThreshold: number): Promise<void> {
    // Maybe send event
    this._itemRepository.update({ id }, { threshold: newThreshold });
  }

  async addStock(id: string, by: number): Promise<UpdateResult> {
    if (!(await this._keyExists('id', id))) {
      throw new Error(`Item with id ${id} does not exist`);
    }

    return this._itemRepository.increment({ id }, 'count', by);
  }

  async reduceStock(id: string, by: number): Promise<UpdateResult> {
    if (!(await this._keyExists('id', id))) {
      throw new Error(`Item with id ${id} does not exist`);
    }

    const item = await this._itemRepository.findOne({ id });
    if (item.count - by < item.threshold) {
      throw new Error();
    }

    return this._itemRepository.decrement({ id }, 'count', by);
  }

  private async _keyExists(key: string, value: string): Promise<boolean> {
    return await this._itemRepository.exists(
      this._itemRepository
        .createQueryBuilder()
        .select('1')
        .from(Item, 'item')
        .where(`item.${key} = '${value}'`)
    );
  }
}
