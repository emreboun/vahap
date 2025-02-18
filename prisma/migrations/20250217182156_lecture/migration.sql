/*
  Warnings:

  - You are about to drop the column `intro_thumbnail` on the `lectures` table. All the data in the column will be lost.
  - You are about to drop the column `main_password` on the `lectures` table. All the data in the column will be lost.
  - You are about to drop the column `main_thumbnail` on the `lectures` table. All the data in the column will be lost.
  - Added the required column `thumbnail` to the `lectures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lectures" DROP COLUMN "intro_thumbnail",
DROP COLUMN "main_password",
DROP COLUMN "main_thumbnail",
ADD COLUMN     "thumbnail" TEXT NOT NULL;
