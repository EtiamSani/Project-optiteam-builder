import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, EditEmployeeDto } from './dto';
import { Employee } from '@prisma/client';


@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService) { }

    async getEmployeesWithSkills(userId: number) {
      return this.prisma.employee.findMany({
        where: {
          userId: userId
        },
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
            },
            include: {
              skills: {
                include: {
                  skill: {
                    select: {
                      name: true, // uniquement le nom de chaque compétence
                    },
                  },
                },
              },
            },
        })
    }

    async createEmployee(dto: CreateEmployeeDto) {   
      return this.prisma.employee.create({
        data: {
          firstname: dto.firstname,
          lastname: dto.lastname,
          job: dto.job,
          personality: dto.personality,
          profilepicture: 'public/profil-default.png',
          userId: dto.userId
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
        },
      });
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

    async addSkillToEmployee( employeeId: number, skillId : number) {
        return await this.prisma.skillToEmployee.create({
          data: {
          employee: {
            connect: { id: employeeId },
          },
          skill: {
            connect: { id: skillId },
          },
        },
      })
    }

    async removeSkillFromEmployee(skillId: number) {
      try {
       
        await this.prisma.skillToEmployee.delete({
          where: {
            id: skillId,
          },
        });
  
     
        return { success: true, message: 'Compétence supprimée avec succès.' };
      } catch (error) {
       
        console.error('Erreur lors de la suppression de la compétence :', error);
        throw error;
      }
    }
}
