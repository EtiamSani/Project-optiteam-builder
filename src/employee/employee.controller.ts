import { Body, Controller, Get, Param, Patch, Post, ParseIntPipe, Delete, HttpCode, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, EditEmployeeDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';


@Controller('employees')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) { }

    @Get()
    getEmployees() {
        return this.employeeService.getEmployeesWithSkills();
    }

    @Get(':id')
    getEmployeesById(@Param('id', ParseIntPipe) employeeId: number) {
        return this.employeeService.getEmployeesWithSkillsById(employeeId);
    }

    @Post()
    createEmployee(@Body() dto: CreateEmployeeDto,
    ) {
        return this.employeeService.createEmployee(dto);
    }

    @Patch(':id')
    editEmployee(@Param('id', ParseIntPipe) employeeId: number, @Body() dto: EditEmployeeDto,
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

    @Post(':id/profile-picture')
    // @Post('profile-picture')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination : "./public/profilePictures",
            filename : (req , file, cb ) => {
                cb(null , `${file.originalname}`)
            } 
        })
    }))

    async uploadFile(
        @Param('id', ParseIntPipe) employeeId: number,
        @UploadedFile() file,
        @Body() dto: EditEmployeeDto
      ) {
        const updatedDto = {
          ...dto,
          profilepicture: file.path.replace(/\\/g, '/'), // Remplace tous les backslashes par des slashes,
        };
    
        return this.employeeService.editEmployeeProfilePicture(updatedDto, employeeId,);
      }
    
    //Ca ca marche
    // uploadFile(@UploadedFile() file): Observable<Object>{
    //     return of({imagePath: file.path});
    // }

    // async createProfilePicture(@Param('id', ParseIntPipe) employeeId: number, @Body() dto: EditEmployeeDto, @UploadedFile() file: Express.Multer.File,) {
    //     const { originalname } = file;
    //     const updatedDto = { ...dto, profile: originalname };
    //     return this.employeeService.editEmployeeProfilePicture(updatedDto, employeeId);
       
    // }
}
