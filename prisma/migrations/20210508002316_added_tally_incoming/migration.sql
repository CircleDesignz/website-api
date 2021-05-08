/*
  Warnings:

  - You are about to drop the column `count` on the `StockEntity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StockEntity" DROP COLUMN "count",
ADD COLUMN     "tally" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "incoming" INTEGER,
ALTER COLUMN "dateCreated" SET DEFAULT CURRENT_TIMESTAMP;
