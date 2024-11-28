-- AlterTable
ALTER TABLE "book" ADD COLUMN     "categories" TEXT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role_id" SET DEFAULT 2;
