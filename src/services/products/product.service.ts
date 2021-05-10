import { RegisterProductDto } from '@controllers/products/dto/register-product.dto';
import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '@services/persistence/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        parts: true
      }
    });
  }

  async registerProduct(dto: RegisterProductDto): Promise<Product> {
    return this.prismaService.product.create({
      data: {
        sku: dto.sku,
        descriptor: dto.descriptor,
        tally: dto.tally,
        isForSale: dto.isForSale,
        parts: {
          connect: [
            { sku: '69696969'}
          ]
        }
      }
    })
  }
}
