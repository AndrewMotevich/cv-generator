import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private dataBaseService: DatabaseService) {}
  getData(): { message: string } {
    return { message: 'Hello from Employees' };
  }

  async getEmployees() {
    return this.dataBaseService.employee.findMany({ take: 10 });
  }

  async addEmployee(dto: EmployeeDto) {
    return this.dataBaseService.employee.create({
      data: dto,
    });
  }

  async deleteEmployee(id: number) {
    return this.dataBaseService.employee.delete({ where: { id: id } });
  }
}
