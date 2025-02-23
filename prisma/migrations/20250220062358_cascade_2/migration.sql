/*
  Warnings:

  - Made the column `product_id` on table `lectures` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "lectures" DROP CONSTRAINT "lectures_product_id_fkey";

-- AlterTable
ALTER TABLE "lectures" ALTER COLUMN "product_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "lectures" ADD CONSTRAINT "lectures_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
