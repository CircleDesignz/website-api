import { Body, Controller, Get, Post } from '@nestjs/common';
import { StockroomService } from '@services/stockroom/stockroom.service';
import { StockEntity } from '.prisma/client';
import { RegisterStockEntityDto } from './dto/register-stock.dto';

@Controller('stockroom')
export class StockroomController {
  constructor(private readonly stockroomService: StockroomService) {}

  @Get()
  async getAll(): Promise<StockEntity[]> {
    return this.stockroomService.getAll();
  }

  @Post()
  async registerStock(@Body() dto: RegisterStockEntityDto): Promise<StockEntity> {
    return this.stockroomService.register(dto);
  }
}
