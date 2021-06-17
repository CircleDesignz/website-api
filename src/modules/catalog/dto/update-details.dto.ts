import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateProductDetailsDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  images?: string[];
}
