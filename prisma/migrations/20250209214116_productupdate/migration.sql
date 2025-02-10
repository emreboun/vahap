/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `lectures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `lectures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lectures" ADD COLUMN     "product_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lectures_product_id_key" ON "lectures"("product_id");

-- AddForeignKey
ALTER TABLE "lectures" ADD CONSTRAINT "lectures_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
