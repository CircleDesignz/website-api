import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class RegisterUnitDto {
  @IsNotEmpty()
  @Length(9, 9)
  @IsAlphanumeric()
  sku: string;

  @IsNotEmpty()
  @IsString()
  descriptor: string;

  @IsNotEmpty()
  @IsNumber()
  initialCount: number;
}
