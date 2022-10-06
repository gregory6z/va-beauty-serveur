/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `service_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `before_after_id` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `before_after` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `services_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services_header_id` to the `services` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_service_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_before_after_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_category_id_fkey";

-- DropForeignKey
ALTER TABLE "specification" DROP CONSTRAINT "specification_service_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "isAvailable",
DROP COLUMN "service_id",
ADD COLUMN     "services_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "before_after_id",
DROP COLUMN "category_id",
DROP COLUMN "description",
ADD COLUMN     "services_header_id" TEXT NOT NULL,
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "token";

-- DropTable
DROP TABLE "before_after";

-- DropTable
DROP TABLE "specification";

-- CreateTable
CREATE TABLE "services_header" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "before_img" TEXT,
    "after_img" TEXT,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "services_header_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "description" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "services_id" TEXT NOT NULL,

    CONSTRAINT "description_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "services_header_name_key" ON "services_header"("name");

-- AddForeignKey
ALTER TABLE "services_header" ADD CONSTRAINT "services_header_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_services_header_id_fkey" FOREIGN KEY ("services_header_id") REFERENCES "services_header"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "description" ADD CONSTRAINT "description_services_id_fkey" FOREIGN KEY ("services_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_services_id_fkey" FOREIGN KEY ("services_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
