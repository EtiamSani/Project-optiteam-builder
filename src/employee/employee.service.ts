import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, EditEmployeeDto } from './dto';
import { Employee } from '@prisma/client';


@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService) { }

    async getEmployeesWithSkills() {
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

    async getEmployeesWithSkillsById(employeeId: number) {
       return this.prisma.employee.findUnique({
            where: {
                id: employeeId
            }
        })
    }

    async createEmployee(dto: CreateEmployeeDto) {
        return this.prisma.employee.create({
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
                profilepicture: 'public/profile-default.png',
            },
        });
    }

    async editEmployee(dto: EditEmployeeDto, employeeId: number) {
        return this.prisma.employee.update({
            where: {
                id: employeeId,
            },
            data: {
               ...dto
            },

        });
    }

    async deleteEmployee(employeeId: number) {
        await this.prisma.employee.delete({
            where: {
                id: employeeId,
            }
        })
    }

    async editEmployeeProfilePicture(updatedDto : EditEmployeeDto, employeeId: number): Promise<Employee>{
        const employee = await this.prisma.employee.findUnique({
            where: {
                id : employeeId
            },
        });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return this.prisma.employee.update({
        where: {
            id: employeeId,
          },
          data: {
            ...updatedDto
          },
    })
    }
}
