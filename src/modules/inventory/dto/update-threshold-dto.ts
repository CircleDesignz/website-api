import { IsNumber, IsOptional, Min } from "class-validator";

export class UpdateThresholdDto {
  @IsNumber()
  @Min(0)
  newThreshold: number;
}