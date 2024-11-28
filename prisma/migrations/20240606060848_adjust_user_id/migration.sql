/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "interaction" DROP CONSTRAINT "interaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "fk_token_user";

-- AlterTable
ALTER TABLE "interaction" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "token" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "pk_user",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "pk_user" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "fk_token_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interaction" ADD CONSTRAINT "interaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
