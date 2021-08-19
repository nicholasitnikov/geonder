/*
  Warnings:

  - You are about to alter the column `lat` on the `Settlement` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `lng` on the `Settlement` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- AlterTable
ALTER TABLE "Settlement" ALTER COLUMN "lat" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "lng" SET DATA TYPE DECIMAL(65,30);
