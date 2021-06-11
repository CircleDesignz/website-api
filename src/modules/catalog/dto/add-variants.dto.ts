import { IsArray, IsString } from "class-validator";

export class AddVariantsToProductsDto {
  @IsArray()
  variantUuids: string[]
}