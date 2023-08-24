import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, EditEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService) {}
    
    getEmployeesWithSkills() {
        return this.prisma.employee.findMany({
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
    }

    async createEmployee (dto : CreateEmployeeDto) {
        const employee = await this.prisma.employee.create({
            data: {
                firstname: dto.firstname,
                lastname: dto.lastname,
                job: dto.job,
                team: {
                    connect: {
                        id: dto.teamId,
                    },
                },
                personality: dto.personality,
                skills: {
                    create: [{
                        skill: {
                            create: {
                                name: dto.skills,
                            },
                        },
                    }],
                },
            },
        });
        return employee;
    }

    async editEmployee (dto : EditEmployeeDto, employeeId : number) {
        const editEmployee = await this.prisma.employee.update({
            where: {
                id: employeeId,
              },
              data: {
                lastname: dto.lastname,
                firstname: dto.firstname,
                job: dto.job,
                personality: dto.personality,
                teamId: dto.teamId,
            },
           
        });
        return editEmployee
        
    }
}
