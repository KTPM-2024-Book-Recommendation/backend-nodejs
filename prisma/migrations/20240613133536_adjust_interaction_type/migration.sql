/*
  Warnings:

  - The values [VIEW,FAVOURITE_BOOK] on the enum `InteractionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InteractionType_new" AS ENUM ('RATING', 'VIEW_COLLABORATIVE', 'VIEW_CONTENT_BASED');
ALTER TABLE "interaction" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "interaction" ALTER COLUMN "type" TYPE "InteractionType_new" USING ("type"::text::"InteractionType_new");
ALTER TYPE "InteractionType" RENAME TO "InteractionType_old";
ALTER TYPE "InteractionType_new" RENAME TO "InteractionType";
DROP TYPE "InteractionType_old";
ALTER TABLE "interaction" ALTER COLUMN "type" SET DEFAULT 'RATING';
COMMIT;

-- AlterTable
ALTER TABLE "interaction" ALTER COLUMN "type" SET DEFAULT 'RATING';
