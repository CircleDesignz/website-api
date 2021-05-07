-- CreateTable
CREATE TABLE "StockEntity" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "descriptor" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockEntity.sku_unique" ON "StockEntity"("sku");
