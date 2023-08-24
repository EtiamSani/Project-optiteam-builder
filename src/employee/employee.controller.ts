import { Body, Controller, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, EditEmployeeDto } from './dto';

@Controller('employees')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Get()
    getEmployees(){
        return this.employeeService.getEmployeesWithSkills();
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
}
