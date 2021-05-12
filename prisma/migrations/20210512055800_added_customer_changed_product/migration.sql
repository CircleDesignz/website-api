/*
  Warnings:

  - You are about to drop the column `sku` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `descriptor` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `tally` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `incoming` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `_ProductToStockEntity` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId]` on the table `stock_entity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddr` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSpent` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToStockEntity" DROP CONSTRAINT "_ProductToStockEntity_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToStockEntity" DROP CONSTRAINT "_ProductToStockEntity_B_fkey";

-- DropIndex
DROP INDEX "product.sku_unique";

-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "shippingAddr" TEXT NOT NULL,
ADD COLUMN     "previousOrders" TEXT[],
ADD COLUMN     "totalSpent" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "customerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "sku",
DROP COLUMN "descriptor",
DROP COLUMN "tally",
DROP COLUMN "incoming",
DROP COLUMN "dateCreated",
ADD COLUMN     "sold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "isForSale" SET DEFAULT false;

-- AlterTable
ALTER TABLE "stock_entity" ADD COLUMN     "productId" TEXT;

-- DropTable
DROP TABLE "_ProductToStockEntity";

-- CreateIndex
CREATE UNIQUE INDEX "stock_entity_productId_unique" ON "stock_entity"("productId");

-- AddForeignKey
ALTER TABLE "stock_entity" ADD FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
