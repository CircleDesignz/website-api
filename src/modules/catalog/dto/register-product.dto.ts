import { ProductStatus } from '@circle/src/common/enums/product-status.enum';
import { IsArray, IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export class RegisterProductDto {
  @IsArray()
  variantUuids: string[];

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsInt()
  @Min(0)
  salesPrice: number;
}
