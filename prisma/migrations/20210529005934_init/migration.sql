/*
  Warnings:

  - You are about to alter the column `image` on the `Store` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE `Store` MODIFY `image` VARCHAR(1000);
