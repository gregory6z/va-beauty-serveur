/*
  Warnings:

  - You are about to drop the column `price` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `services` table. All the data in the column will be lost.
  - Added the required column `price` to the `specification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `specification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "price",
DROP COLUMN "time";

-- AlterTable
ALTER TABLE "specification" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL;
