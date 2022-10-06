/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `before_after_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "before_after_id" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "before_after" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "beforeImg" TEXT,
    "afterImg" TEXT,

    CONSTRAINT "before_after_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "before_after_name_key" ON "before_after"("name");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_before_after_id_fkey" FOREIGN KEY ("before_after_id") REFERENCES "before_after"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
