import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillsDto, EditSkillsDto } from './dto';

@Injectable()
export class SkillsService {
    constructor(private prisma: PrismaService) {}

    async getSkills() {
        return this.prisma.skill.findMany()
    }

    async getSkillsById(skillsId : number) {
        return this.prisma.skill.findUnique({
            where: {
                id: skillsId
            }

        })
    }

    async editSkill(skillsId : number, dto : EditSkillsDto) {
        return this.prisma.skill.update({
            where : {
                id: skillsId
            },
            data: {
                ...dto
            }
        })
    }

    async createSkill(dto: CreateSkillsDto) {
       return this.prisma.skill.create({
            data: {
                name: dto.name
            }
        })

    }

    async deleteSkill(skillId:number){
       return this.prisma.skill.delete({
            where : {
                id: skillId
            }
        })
    }

}
