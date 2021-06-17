import { Controller, Get } from '@nestjs/common';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly _cartService: CartService) {}

  @Get('/test-list')
  async listCart(): Promise<{ [key: string]: string }> {
    return this._cartService.listCart('user:0');
  }

  @Get('/test-add')
  async addCart(): Promise<void> {
    this._cartService.addToCart('user:0', 'prod3', 50);
  }

  @Get('/test-delete')
  async clearCart(): Promise<void> {
    this._cartService.clearCart('user:0');
  }
}
