/*
  Warnings:

  - You are about to drop the column `eventDate` on the `event_tickets` table. All the data in the column will be lost.
  - You are about to drop the column `eventName` on the `event_tickets` table. All the data in the column will be lost.
  - You are about to drop the column `soldTickets` on the `event_tickets` table. All the data in the column will be lost.
  - Added the required column `date` to the `event_tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `event_tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lectures" DROP CONSTRAINT "lectures_product_id_fkey";

-- AlterTable
ALTER TABLE "event_tickets" DROP COLUMN "eventDate",
DROP COLUMN "eventName",
DROP COLUMN "soldTickets",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "lectures" ALTER COLUMN "product_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "lectures" ADD CONSTRAINT "lectures_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
