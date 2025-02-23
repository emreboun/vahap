-- AlterTable
ALTER TABLE "lecture_resources" ADD COLUMN     "content" TEXT,
ALTER COLUMN "url" DROP NOT NULL;
