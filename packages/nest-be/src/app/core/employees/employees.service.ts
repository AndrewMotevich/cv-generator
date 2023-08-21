import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private dataBaseService: DatabaseService,
  ) {}

  async getEmployees() {
    return this.dataBaseService.employee.findMany({
      take: 10,
      include: { department: true, specialization: true },
    });
  }

  async addEmployee(dto: EmployeeDto) {
    return await this.dataBaseService.employee.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        department: {
          connectOrCreate: {
            where: { name: dto.department },
            create: { name: dto.department },
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
  }

  async deleteEmployee(id: number) {
    return this.dataBaseService.employee.delete({ where: { id: id } });
  }
}
