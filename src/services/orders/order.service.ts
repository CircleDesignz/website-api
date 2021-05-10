import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/persistence/prisma.service';
import { Order, OrderStatus, PaymentStatus } from '@prisma/client';
import { RegisterOrderDto } from '@controllers/orders/dto/register-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  async registerOrder(dto: RegisterOrderDto): Promise<Order> {
    // assumes customer is registered before this is called
    const { customerId, itemsBySku } = dto;

    try {
      const ids = [];
      for (const item in itemsBySku) {
        ids.push({ id: item });
      }

      return this.prismaService.order.create({
        data: {
          customer: { connect: { id: customerId } },
          items: {
            connect: ids,
          },
          paymentStatus: PaymentStatus.PENDING,
          orderStatus: OrderStatus.OPEN,
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
