/*
  Warnings:

  - You are about to drop the column `services_HeaderId` on the `description` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "description" DROP CONSTRAINT "description_services_HeaderId_fkey";

-- AlterTable
ALTER TABLE "description" DROP COLUMN "services_HeaderId";
