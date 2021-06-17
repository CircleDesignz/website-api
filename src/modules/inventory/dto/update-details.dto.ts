import { IsOptional, IsString } from "class-validator";

export class UpdateItemDetailsDto {
  @IsString()
  @IsOptional()
  descriptor?: string;

  @IsString()
  @IsOptional()
  details?: string;
}