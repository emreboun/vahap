/*
  Warnings:

  - You are about to drop the `pipe_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LectureTags" DROP CONSTRAINT "_LectureTags_B_fkey";

-- DropTable
DROP TABLE "pipe_tags";

-- CreateTable
CREATE TABLE "lecture_tags" (
    "id" UUID NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lecture_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lecture_tags_name_key" ON "lecture_tags"("name");

-- AddForeignKey
ALTER TABLE "_LectureTags" ADD CONSTRAINT "_LectureTags_B_fkey" FOREIGN KEY ("B") REFERENCES "lecture_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
