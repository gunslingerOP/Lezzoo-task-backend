/*
  Warnings:

  - Added the required column `store_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `store_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
