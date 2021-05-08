import { Controller, Get } from '@nestjs/common';
import { StockroomService } from '@services/stockroom/stockroom.service';
import { StockEntity } from '.prisma/client';

@Controller('stockroom')
export class StockroomController {
  constructor(private readonly stockroomService: StockroomService) {}

  @Get()
  async getAll(): Promise<StockEntity[]> {
    return this.stockroomService.getAll();
  }
}
