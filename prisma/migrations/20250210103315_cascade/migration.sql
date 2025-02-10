-- DropForeignKey
ALTER TABLE "lectures" DROP CONSTRAINT "lectures_product_id_fkey";

-- AddForeignKey
ALTER TABLE "lectures" ADD CONSTRAINT "lectures_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
