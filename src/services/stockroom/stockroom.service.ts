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

  async getById(sku: string): Promise<StockEntity> {
    return this.prismaService.stockEntity.findUnique({
      where: {
        sku: sku,
      },
    });
  }

  async register(dto: RegisterStockEntityDto): Promise<StockEntity> {
    this._throwSkuExists(dto.sku);

    // Create a product stock entity
    if (dto.productId !== undefined) {
      return this.prismaService.stockEntity.create({
        data: {
          sku: dto.sku,
          descriptor: dto.descriptor,
          tally: dto.tally,
          product: {
            connect: {
              id: dto.productId,
            },
          },
        },
      });
    }

    return this.prismaService.stockEntity.create({
      data: {
        ...dto,
      },
    });
  }

  async archive(sku: string): Promise<StockEntity> {
    this._throwSkuNotExists(sku);

    const productId = (await this.prismaService.stockEntity.findUnique({
      where: {
        sku: sku
      }
    })).productId;

    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId
      },
      include: {
        orders: true
      }
    })

    if (product.isForSale) {
      throw new Error('Stock entity is a product that is currently for sale');
    } else if (product.orders.length > 0) {
      throw new Error ('There are outstanding orders for this product')
    }

    return this.prismaService.stockEntity.update({
      where: {
        sku: sku,
      },
      data: {
        isArchived: true,
      },
    });
  }

  async delete(sku: string): Promise<void> {
    const unit = await this._throwSkuNotExists(sku);
    if (!unit.isArchived) {
      throw new Error('Cannot delete unit that is not archived');
    }
    this.prismaService.stockEntity.delete({
      where: { sku: sku },
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

  async _throwSkuNotExists(sku: string): Promise<StockEntity> {
    const existing = await this.prismaService.stockEntity.findUnique({
      where: {
        sku: sku,
      },
    });

    if (!!existing) {
      throw new Error(`An with SKU ${sku} doesn't exist`);
    }
    return existing;
  }
}
