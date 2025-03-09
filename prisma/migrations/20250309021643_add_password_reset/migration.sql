-- CreateTable
CREATE TABLE "user_pass_tokens" (
    "token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pass_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_pass_tokens_user_id_key" ON "user_pass_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "user_pass_tokens" ADD CONSTRAINT "user_pass_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
