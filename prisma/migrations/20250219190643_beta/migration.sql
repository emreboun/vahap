-- AlterTable
ALTER TABLE "lectures" ALTER COLUMN "thumbnail" SET DEFAULT '';

-- CreateTable
CREATE TABLE "lecture_resources" (
    "id" UUID NOT NULL,
    "lecture_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "lecture_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_tickets" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "capacity" INTEGER NOT NULL,
    "soldTickets" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "event_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_lecture_access" (
    "user_id" UUID NOT NULL,
    "lecture_id" UUID NOT NULL,
    "accessGranted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_lecture_access_pkey" PRIMARY KEY ("user_id","lecture_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_tickets_product_id_key" ON "event_tickets"("product_id");

-- AddForeignKey
ALTER TABLE "lecture_resources" ADD CONSTRAINT "lecture_resources_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lectures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_tickets" ADD CONSTRAINT "event_tickets_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lecture_access" ADD CONSTRAINT "user_lecture_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lecture_access" ADD CONSTRAINT "user_lecture_access_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lectures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
