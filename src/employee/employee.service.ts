import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, EditEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService) { }

    async getEmployeesWithSkills() {
        const employee = this.prisma.employee.findMany({
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
        return employee;
    }

    async getEmployeesWithSkillsById(employeeId: number) {
        const employee = this.prisma.employee.findUnique({
            where: {
                id: employeeId
            }
        })
        return employee;
    }

    async createEmployee(dto: CreateEmployeeDto) {
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
            },
        });
        return employee;
    }

    async editEmployee(dto: EditEmployeeDto, employeeId: number) {
        const editEmployee = await this.prisma.employee.update({
            where: {
                id: employeeId,
            },
            data: {
               ...dto
            },

        });
        return editEmployee

    }

    async deleteEmployee(employeeId: number) {
        await this.prisma.employee.delete({
            where: {
                id: employeeId,
            }
        })
    }
}
