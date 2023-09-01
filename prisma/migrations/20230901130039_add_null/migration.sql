-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_teamId_fkey`;

-- AlterTable
ALTER TABLE `Employee` MODIFY `teamId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
