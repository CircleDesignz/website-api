-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "descriptor" TEXT NOT NULL,
    "tally" INTEGER NOT NULL,
    "incoming" INTEGER,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isForSale" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToStockEntity" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product.sku_unique" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToStockEntity_AB_unique" ON "_ProductToStockEntity"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToStockEntity_B_index" ON "_ProductToStockEntity"("B");

-- AddForeignKey
ALTER TABLE "_ProductToStockEntity" ADD FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToStockEntity" ADD FOREIGN KEY ("B") REFERENCES "StockEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
