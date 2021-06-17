import { OrderStatus } from "@circle/common/enums/order-status.enum";
import { PaymentStatus } from "@circle/common/enums/payment-status.enum";
import { IsArray, IsEnum, IsString } from "class-validator";

export class RegisterOrderDto {
  @IsString()
  customerId: string;

  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}