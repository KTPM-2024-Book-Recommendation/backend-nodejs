-- AlterTable
ALTER TABLE "interaction" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "recommended_book" (
    "user_id" VARCHAR(255) NOT NULL,
    "book_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "recommended_book_user_id_book_id_key" ON "recommended_book"("user_id", "book_id");

-- AddForeignKey
ALTER TABLE "recommended_book" ADD CONSTRAINT "recommended_book_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommended_book" ADD CONSTRAINT "recommended_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
