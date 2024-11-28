/*
  Warnings:

  - You are about to alter the column `user_id` on the `interaction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `user_id` on the `token` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "interaction" DROP CONSTRAINT "interaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "fk_token_user";

-- AlterTable
ALTER TABLE "interaction" ALTER COLUMN "user_id" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "token" ALTER COLUMN "user_id" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "pk_user",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "pk_user" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "fk_token_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interaction" ADD CONSTRAINT "interaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
