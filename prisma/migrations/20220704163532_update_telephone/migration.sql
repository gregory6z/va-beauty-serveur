/*
  Warnings:

  - You are about to drop the column `tel` on the `users` table. All the data in the column will be lost.
  - Added the required column `telephone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "tel",
ADD COLUMN     "telephone" TEXT NOT NULL;