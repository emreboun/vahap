-- AlterTable
ALTER TABLE "products" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "pipe_tags" (
    "id" UUID NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pipe_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LectureTags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_LectureTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "pipe_tags_name_key" ON "pipe_tags"("name");

-- CreateIndex
CREATE INDEX "_LectureTags_B_index" ON "_LectureTags"("B");

-- AddForeignKey
ALTER TABLE "_LectureTags" ADD CONSTRAINT "_LectureTags_A_fkey" FOREIGN KEY ("A") REFERENCES "lectures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LectureTags" ADD CONSTRAINT "_LectureTags_B_fkey" FOREIGN KEY ("B") REFERENCES "pipe_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
