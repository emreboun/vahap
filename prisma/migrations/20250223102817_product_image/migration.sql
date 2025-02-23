-- AlterTable
ALTER TABLE "files" ADD COLUMN     "product_id" UUID,
ALTER COLUMN "lecture_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
