-- AlterTable
ALTER TABLE "description" ADD COLUMN     "services_HeaderId" TEXT;

-- AddForeignKey
ALTER TABLE "description" ADD CONSTRAINT "description_services_HeaderId_fkey" FOREIGN KEY ("services_HeaderId") REFERENCES "services_header"("id") ON DELETE SET NULL ON UPDATE CASCADE;
