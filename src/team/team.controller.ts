import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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

    @Get(':id')
    getByTeamWithEmployees(@Param('id', ParseIntPipe) employeeId: number) {

        return this.employeeService.getByTeamWithEmployees();
    }

    @Patch(':id')
    editTeam(@Param('id', ParseIntPipe) employeeId: number) {
        return this.employeeService.editTeam();
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteTeam(@Param('id', ParseIntPipe) employeeId: number) {

    }



}
