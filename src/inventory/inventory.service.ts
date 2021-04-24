import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/inventory-unit.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Unit)
    private inventoryRepository: Repository<Unit>,
  ) {}

  sayHello(): string {
    return 'hello :)';
  }

  findAll(): Promise<Unit[]> {
    return this.inventoryRepository.find();
  }
}

