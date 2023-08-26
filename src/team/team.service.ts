import { Body, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto';
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
        const team = await this.prisma.team.findUnique({
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
        return team;
    }    
    

    async editTeam (teamId: number, @Body() dto: CreateTeamDto) {
        const team = await this.prisma.team.update({
            where : {
                id: teamId
            }, data : {
                ...dto
            }
        })
        return team;
    }

    async deleteTeam (teamId: number) {

    }
}
