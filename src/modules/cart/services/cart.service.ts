import { Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly _cartRepository: CartRepository) {}

  async listCart(seshId: string): Promise<{ [key: string]: string }> {
    return this._cartRepository.findMany(seshId);
  }

  async addToCart(
    seshId: string,
    sku: string,
    quantity: number
  ): Promise<void> {
    this._cartRepository.setHash(seshId, [sku, quantity.toString()]);
  }

  async clearCart(seshId: string): Promise<void> {
    this._cartRepository.clearHash(seshId);
  }
}
