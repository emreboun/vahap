/*
  Warnings:

  - The primary key for the `purchases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `purchases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "purchases_pkey" PRIMARY KEY ("user_id", "product_id");
