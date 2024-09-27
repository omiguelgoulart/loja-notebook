/*
  Warnings:

  - You are about to alter the column `memoriaRam` on the `notebooks` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `notebooks` MODIFY `memoriaRam` DOUBLE NOT NULL DEFAULT 0;
