/*
  Warnings:

  - You are about to drop the column `ram` on the `notebooks` table. All the data in the column will be lost.
  - You are about to drop the column `tela` on the `notebooks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notebooks` DROP COLUMN `ram`,
    DROP COLUMN `tela`;
