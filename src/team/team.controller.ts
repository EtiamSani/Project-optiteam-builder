import { Body, Controller, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto';

@Controller('team')
export class TeamController {
    constructor(private employeeService: TeamService) { }
    @Post()
    createTeam(@Body() dto: CreateTeamDto,
    ) {
        return this.employeeService.createTeam(dto);
    }
}
