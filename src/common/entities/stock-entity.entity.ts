class StockEntity implements IStockEntity {
  _id: string;
  sku: string;
  descriptor: string;
  count: number;
  dateCreated?: Date;
}