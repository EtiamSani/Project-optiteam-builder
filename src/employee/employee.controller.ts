import { Body, Controller, Get, Param, Patch, Post, ParseIntPipe, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, EditEmployeeDto } from './dto';

@Controller('employees')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Get()
    getEmployees(){
        return this.employeeService.getEmployeesWithSkills();
    }

    @Get(':id')
    getEmployeesById(@Param('id', ParseIntPipe) employeeId: number){
        return this.employeeService.getEmployeesWithSkillsById(employeeId);
    }

    @Post()
    createEmployee (@Body() dto: CreateEmployeeDto,
    ) {
        return this.employeeService.createEmployee(dto);
    }

    @Patch(':id')
    editEmployee (@Param('id', ParseIntPipe) employeeId: number, @Body() dto: EditEmployeeDto,
    ) {
        return this.employeeService.editEmployee(dto, employeeId);
    }

    //@HttpCode(HttpStatus.NO_CONTENT) est utilisée pour indiquer que la réponse HTTP à une action ou à une méthode doit avoir un code de statut 204 No Content
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteEmployee(@Param('id', ParseIntPipe) employeeId: number) {
        return this.employeeService.deleteEmployee(
            employeeId,
          );
    }
}
