/*
  Warnings:

  - You are about to drop the column `accessGranted` on the `user_lecture_access` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_lecture_access" DROP COLUMN "accessGranted",
ADD COLUMN     "granted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
