export type RegisterProductDto = {
  sku: string;
  descriptor: string;
  tally: number;
  isForSale: true;
  partsSku: string[];
}