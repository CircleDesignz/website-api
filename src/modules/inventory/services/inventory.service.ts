import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterItemDto } from '../dto/register-item.dto';
import { Item } from '../entities/item.entity';
import { ItemRepository } from '../repositories/item.repository';

@Injectable()
export class InventoryService {
  constructor(private readonly _itemRepository: ItemRepository) {}

  async listAllUnits(): Promise<Item[]> {
    return this._itemRepository.find();
  }

  // Prob delete
  async findManyByUuid(uuids: string[]): Promise<Item[]> {
    return this._itemRepository
      .createQueryBuilder('item')
      .where('item.uuid IN (:...ids)', { ids: uuids })
      .getMany();
  }

  async registerUnit(dto: RegisterItemDto): Promise<Item> {
    if (await this._keyExists('sku', dto.sku)) {
      throw new ConflictException();
    }

    const item = this._itemRepository.create({
      ...dto,
    });

    return this._itemRepository.save(item);
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
