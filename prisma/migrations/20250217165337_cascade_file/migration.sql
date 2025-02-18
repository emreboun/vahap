-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_lecture_id_fkey";

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lectures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
