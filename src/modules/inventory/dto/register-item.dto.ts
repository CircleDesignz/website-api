import { IsAlphanumeric, IsInt, IsOptional, IsString, Length } from "class-validator";

export class RegisterItemDto {
  @IsAlphanumeric()
  @Length(8, 8)
  sku: string;

  @IsString()
  descriptor: string;

  @IsString()
  @IsOptional()
  details?: string;

  @IsInt()
  count: number;
}