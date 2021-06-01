import { IsAlphanumeric, IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class RegisterProductDto {
  @IsString()
  @Length(9, 9)
  @IsAlphanumeric()
  sku: string;

  @IsNotEmpty()
  @IsString()
  descriptor: string;

  @IsInt()
  @Min(0)
  initialCount: number;

  @IsInt()
  cost?: number;

  @IsInt()
  price: number;
}