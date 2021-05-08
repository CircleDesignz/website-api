import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/persistence/prisma.service';
import { StockEntity } from '@prisma/client';

@Injectable()
export class StockroomService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<StockEntity[]> {
    return this.prismaService.stockEntity.findMany()
  }
}
