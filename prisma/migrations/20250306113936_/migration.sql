/*
  Warnings:

  - You are about to drop the column `name` on the `user_addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_addresses" DROP COLUMN "name",
ADD COLUMN     "title" TEXT;
