import { Body, Injectable } from '@nestjs/common';
import { CreateTeamDto, EditTeamDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService) {}

    async createTeam (@Body() dto: CreateTeamDto,
    ) {
        return this.prisma.team.create({
            data: {
                name: dto.name,

            }
        });
    }

    async getByTeamWithEmployees(teamId: number) {
       return this.prisma.team.findUnique({
            where: {
                id: teamId
            },
            include: {
                employees: {
                    include: {
                        team: true,
                        skills: true
                    }
                }
            }
        });
    }    
    

    async editTeam (teamId: number, @Body() dto: EditTeamDto) {
        return this.prisma.team.update({
            where : {
                id: teamId
            }, data : {
                ...dto
            }
        })
    }

    async deleteTeam (teamId: number) {
        return this.prisma.team.delete({
            where : {
                id: teamId
            }
        })
    }
}
