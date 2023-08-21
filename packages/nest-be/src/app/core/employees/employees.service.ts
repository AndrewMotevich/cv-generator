import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private dataBaseService: DatabaseService,
  ) {}

  async getEmployees() {
    try {
      return this.dataBaseService.employee.findMany({
        take: 10,
        include: { department: true, specialization: true },
      });
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async addEmployee(dto: EmployeeDto) {
    try {
      return await this.dataBaseService.employee.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          department: {
            connectOrCreate: {
              where: { name: dto.department.toLocaleLowerCase() },
              create: { name: dto.department.toLocaleUpperCase() },
            },
          },
          specialization: {
            connectOrCreate: {
              where: { name: dto.specialization },
              create: { name: dto.specialization },
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async deleteEmployee(id: number) {
    try {
      return this.dataBaseService.employee.delete({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
