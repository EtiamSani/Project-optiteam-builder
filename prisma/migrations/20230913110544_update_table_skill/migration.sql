-- DropForeignKey
ALTER TABLE `SkillToEmployee` DROP FOREIGN KEY `SkillToEmployee_skillId_fkey`;

-- AddForeignKey
ALTER TABLE `SkillToEmployee` ADD CONSTRAINT `SkillToEmployee_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
