import { PaymentStatus } from 'src/common/enums/payment-status.enum';

export class RegisterOrderDto {
  customerId: string;
  itemIds: string[];
  paymentStatus: PaymentStatus;
}
