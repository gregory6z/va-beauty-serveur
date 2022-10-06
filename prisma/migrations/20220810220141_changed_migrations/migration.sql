/*
  Warnings:

  - You are about to drop the column `services_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `services_id` on the `description` table. All the data in the column will be lost.
  - Added the required column `service_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_id` to the `description` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_services_id_fkey";

-- DropForeignKey
ALTER TABLE "description" DROP CONSTRAINT "description_services_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "services_id",
ADD COLUMN     "service_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "description" DROP COLUMN "services_id",
ADD COLUMN     "service_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "description" ADD CONSTRAINT "description_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
