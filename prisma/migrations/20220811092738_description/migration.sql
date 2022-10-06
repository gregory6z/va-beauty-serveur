/*
  Warnings:

  - You are about to drop the `description` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "description" DROP CONSTRAINT "description_service_id_fkey";

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "description" TEXT[];

-- DropTable
DROP TABLE "description";
