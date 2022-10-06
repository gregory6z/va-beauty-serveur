/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "appointments_date_key" ON "appointments"("date");
