import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto';

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) { }

    @Post()
    createTeam(@Body() dto: CreateTeamDto,
    ) {
        return this.teamService.createTeam(dto);
    }

    @Get(':id')
    getByTeamWithEmployees(@Param('id', ParseIntPipe) teamId: number) {

        return this.teamService.getByTeamWithEmployees(teamId);
    }

    @Patch(':id')
    editTeam(@Param('id', ParseIntPipe) teamId: number, @Body() dto: CreateTeamDto) {
        return this.teamService.editTeam(teamId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteTeam(@Param('id', ParseIntPipe) teamId: number) {
        return this.teamService.deleteTeam(
            teamId,
        );
    }

    @Post(':teamId/employee/:employeeId')
      addEmployeeToTeam(@Param('teamId', ParseIntPipe) teamId: number, @Param('employeeId', ParseIntPipe) employeeId: number){
        return this.teamService.addEmployeeToTeam(teamId,employeeId)
      }



}
