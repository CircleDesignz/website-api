import { ProductStatus } from '@circle/common/enums/product-status.enum';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class RegisterProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  variantUuids: string[];

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsInt()
  @Min(0)
  salesPrice: number;
}
