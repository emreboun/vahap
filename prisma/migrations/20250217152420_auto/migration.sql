-- AlterTable
CREATE SEQUENCE lectures_order_seq;
ALTER TABLE "lectures" ALTER COLUMN "order" SET DEFAULT nextval('lectures_order_seq');
ALTER SEQUENCE lectures_order_seq OWNED BY "lectures"."order";
