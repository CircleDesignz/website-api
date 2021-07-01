import { IsString } from "class-validator";

export class InvokeSaleDto {
  @IsString()
  variantId: string;
}