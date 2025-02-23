/*
  Warnings:

  - Added the required column `name` to the `lecture_resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lecture_resources" ADD COLUMN     "name" TEXT NOT NULL;
