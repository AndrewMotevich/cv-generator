import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { EmployeeDto } from './dto/employee.dto';
import { transformEmployeeDto } from '../../database/helpers/transform-employee-dto.helper';

@Injectable()
export class EmployeesService {
  constructor(private dataBaseService: DatabaseService) {}

  async getEmployees() {
    try {
      return this.dataBaseService.employee.findMany({
        include: {
          department: true,
          specialization: true,
          cvs: {
            include: {
              department: true,
              language: true,
              skills: true,
              specialization: true,
              cvsProjects: {
                include: {
                  responsibilities: true,
                  teamRoles: true,
                  techStack: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addEmployee(dto: EmployeeDto) {
    try {
      return await this.dataBaseService.employee.create({
        data: transformEmployeeDto(dto),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteEmployee(id: number) {
    try {
      return this.dataBaseService.employee.delete({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
