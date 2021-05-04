import { IsString, IsNumber, IsInt, Min } from 'class-validator';

export class RegisterUnitDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  costInCad: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  priceInCad: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(0)
  weightInKg: number;
}
