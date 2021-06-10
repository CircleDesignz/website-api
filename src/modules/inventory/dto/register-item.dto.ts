import { IsAlphanumeric, IsInt, IsString, Length } from "class-validator";

export class RegisterItemDto {
  @IsAlphanumeric()
  @Length(8, 8)
  sku: string;

  @IsString()
  descriptor: string;

  @IsInt()
  count: number;
}