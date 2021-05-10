import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "@services/products/product.service";
import { Product } from '@prisma/client';
import { RegisterProductDto } from "./dto/register-product.dto";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Post()
  async registerProduct(@Body() dto: RegisterProductDto): Promise<Product> {
    return this.productService.registerProduct(dto);
  }

}