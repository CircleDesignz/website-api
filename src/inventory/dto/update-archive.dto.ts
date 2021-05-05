import { IsString, Length, IsBoolean } from 'class-validator';

export class UpdateArchiveDto {
  @IsString()
  @Length(8, 12)
  sku: string;

  @IsBoolean()
  isArchived: boolean;
}