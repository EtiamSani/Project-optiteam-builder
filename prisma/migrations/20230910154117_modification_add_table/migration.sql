/*
  Warnings:

  - You are about to drop the column `teamId` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_teamId_fkey`;

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `teamId`;

-- CreateTable
CREATE TABLE `TeamHasEmployee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SkillToEmployeeToTeamHasEmployee` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SkillToEmployeeToTeamHasEmployee_AB_unique`(`A`, `B`),
    INDEX `_SkillToEmployeeToTeamHasEmployee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TeamHasEmployee` ADD CONSTRAINT `TeamHasEmployee_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamHasEmployee` ADD CONSTRAINT `TeamHasEmployee_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SkillToEmployeeToTeamHasEmployee` ADD CONSTRAINT `_SkillToEmployeeToTeamHasEmployee_A_fkey` FOREIGN KEY (`A`) REFERENCES `SkillToEmployee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SkillToEmployeeToTeamHasEmployee` ADD CONSTRAINT `_SkillToEmployeeToTeamHasEmployee_B_fkey` FOREIGN KEY (`B`) REFERENCES `TeamHasEmployee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
