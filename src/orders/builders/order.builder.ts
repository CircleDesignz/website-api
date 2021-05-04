import { Inject, Injectable } from "@nestjs/common";
import { FulfillStatus } from "src/common/data/fulfill-stats.data";
import { PaymentStatus } from "src/common/data/payment-status.data";
import { Customer } from "src/customers/customer.entity";
import { CustomersService } from "src/customers/customers.service";
import { InventoryUnit } from "src/inventory/inventory-unit.entity";
import { InventoryService } from "src/inventory/inventory.service";
import { RegisterOrderDto } from "../dto/register-order.dto"
import { Order } from "../order.entity"

@Injectable()
export class OrderBuilder {
  constructor(
    @Inject(InventoryService)
    private readonly inventoryService: InventoryService,
    @Inject(CustomersService)
    private readonly customerService: CustomersService,
  ) {};

  async buildFromtDto(dto: RegisterOrderDto): Promise<Order> {
    const newOrder = new Order();
    newOrder.dateCreated = await this.buildDateCreated(dto.dateCreated);
    newOrder.items = await this.buildItems(dto.items);
    newOrder.customer = await this.buildCustomer(dto.customerId);
    newOrder.currency = dto.currency;
    newOrder.paymentStatus = PaymentStatus.PENDING;
    newOrder.fulfillStatus = FulfillStatus.PENDING;
    return newOrder;
  }

  private async buildDateCreated(dateString: string): Promise<Date> {
    return new Date(dateString);
  }

  private async buildItems(skus: string[]): Promise<InventoryUnit[]> {
    let units: InventoryUnit[] = [];
    for (let sku in skus) {
      units.push(await this.inventoryService.findOne(sku))
    }
    return units;
  }

  private async buildCustomer(customerId: string): Promise<Customer> {
    return this.customerService.findOne(customerId);
  }

}
