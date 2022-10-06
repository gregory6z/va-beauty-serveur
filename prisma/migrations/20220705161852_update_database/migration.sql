/*
  Warnings:

  - Added the required column `price` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `services` table without a default value. This is not possible if the table is not empty.
  - Made the column `category_id` on table `services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `service_id` on table `specification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_category_id_fkey";

-- DropForeignKey
ALTER TABLE "specification" DROP CONSTRAINT "specification_service_id_fkey";

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL,
ALTER COLUMN "category_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "specification" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "service_id" SET NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specification" ADD CONSTRAINT "specification_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
