-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "LoginType" AS ENUM ('LOCAL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('VIETNAMESE', 'ENGLISH');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('RATING', 'VIEW', 'FAVOURITE_BOOK');

-- CreateEnum
CREATE TYPE "PeriodType" AS ENUM ('DAYS', 'WEEK', 'MONTH');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) DEFAULT 'Viet Nam',
    "avatar" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "date_of_birth" TIMESTAMPTZ(6) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'FEMALE',
    "password" VARCHAR(255) NOT NULL,
    "role_id" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "login_type" "LoginType" NOT NULL DEFAULT 'LOCAL',

    CONSTRAINT "pk_user" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "device_id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "refresh_token" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_token" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL,
    "type" "RoleType" NOT NULL DEFAULT 'USER',

    CONSTRAINT "pk_role" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "preprocessed_description" TEXT,
    "book_cover" VARCHAR(255),
    "language" "Language",
    "image_url" VARCHAR(255),
    "release_date" DATE,
    "publisher" VARCHAR(255),
    "number_of_pages" INTEGER,
    "price" REAL,
    "average_rating" REAL,
    "number_of_ratings" INTEGER,
    "number_of_reviews" INTEGER,
    "source_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_book" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255),

    CONSTRAINT "pk_author" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author_to_book" (
    "author_id" UUID NOT NULL,
    "book_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "source" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_source" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interaction" (
    "user_id" UUID NOT NULL,
    "book_id" TEXT NOT NULL,
    "type" "InteractionType" NOT NULL DEFAULT 'VIEW',
    "value" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "SettingCrawl" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "period_type" "PeriodType" NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "pk_setting_crawl" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ixuq_token_user_device" ON "token"("device_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "author_to_book_author_id_book_id_key" ON "author_to_book"("author_id", "book_id");

-- CreateIndex
CREATE UNIQUE INDEX "interaction_user_id_book_id_type_key" ON "interaction"("user_id", "book_id", "type");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fk_user_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "fk_token_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_to_book" ADD CONSTRAINT "author_to_book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_to_book" ADD CONSTRAINT "author_to_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interaction" ADD CONSTRAINT "interaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interaction" ADD CONSTRAINT "interaction_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
