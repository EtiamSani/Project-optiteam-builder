-- DropForeignKey
ALTER TABLE `SkillToEmployee` DROP FOREIGN KEY `SkillToEmployee_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamHasEmployee` DROP FOREIGN KEY `TeamHasEmployee_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamHasEmployee` DROP FOREIGN KEY `TeamHasEmployee_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_teamId_fkey`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillToEmployee` ADD CONSTRAINT `SkillToEmployee_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamHasEmployee` ADD CONSTRAINT `TeamHasEmployee_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamHasEmployee` ADD CONSTRAINT `TeamHasEmployee_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
