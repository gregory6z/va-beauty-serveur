/*
  Warnings:

  - Made the column `name` on table `specification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "specification" ALTER COLUMN "name" SET NOT NULL;
