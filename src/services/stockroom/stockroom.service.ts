import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/persistence/prisma.service';
import { Product, StockEntity } from '@prisma/client';
import { RegisterStockEntityDto } from '@controllers/stockroom/dto/register-stock.dto';

@Injectable()
export class StockroomService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<StockEntity[]> {
    return this.prismaService.stockEntity.findMany();
  }

  async register(dto: RegisterStockEntityDto): Promise<StockEntity> {
    this._throwSkuExists(dto.sku);

    return this.prismaService.stockEntity.create({
      data: {
        ...dto,
        productAssociations: {
          create: [] // Might not need this
        }

      },
    });
  }

  async archiveItem(sku: string): Promise<StockEntity> {
    // TODO: check if outstanding orders exist, check product dependencies
    return this.prismaService.stockEntity.update({
      where: {
        sku: sku,
      },
      data: {
        isArchived: true,
      },
    });
  }

  async _throwSkuExists(sku: string): Promise<void> {
    const existing = await this.prismaService.stockEntity.findUnique({
      where: {
        sku: sku,
      },
    });

    if (existing) {
      throw new Error(`An with SKU ${sku} already exists`);
    }
  }

  async _throwSkuNotExists(sku: string): Promise<void> {
    const existing = await this.prismaService.stockEntity.findUnique({
      where: {
        sku: sku,
      },
    });

    if (!!existing) {
      throw new Error(`An with SKU ${sku} doesn't exist`);
    }
  }
}
