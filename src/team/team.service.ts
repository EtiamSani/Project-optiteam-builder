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
}
