/*
  Warnings:

  - You are about to drop the `recommended_book` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ModelType" AS ENUM ('COLLABORATIVE', 'CONTENT_BASED');

-- DropForeignKey
ALTER TABLE "recommended_book" DROP CONSTRAINT "recommended_book_book_id_fkey";

-- DropForeignKey
ALTER TABLE "recommended_book" DROP CONSTRAINT "recommended_book_user_id_fkey";

-- DropTable
DROP TABLE "recommended_book";

-- CreateTable
CREATE TABLE "model_request" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "model_type" "ModelType" NOT NULL,
    "count" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_model_request" PRIMARY KEY ("id")
);
