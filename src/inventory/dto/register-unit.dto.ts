import { IsString, IsNumber, IsInt, Min, Max } from 'class-validator';
import { CD_MAX_SAFE_INT } from 'src/common/constants/constants';

export class RegisterUnitDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(CD_MAX_SAFE_INT)
  costInCad: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(CD_MAX_SAFE_INT)
  priceInCad: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(0)
  weightInKg: number;
}
