import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { EmployeeDto } from './dto/employee.dto';
import { DepartmentService } from '../../shared/department/department.service';
import { SpecializationService } from '../../shared/specialization/specialization.service';

@Injectable()
export class EmployeesService {
  constructor(
    private dataBaseService: DatabaseService,
    private departmentService: DepartmentService,
    private specializationService: SpecializationService
  ) {}

  async getEmployees() {
    return this.dataBaseService.employee.findMany({ take: 10 });
  }

  async addEmployee(dto: EmployeeDto) {
    const departmentId = await this.departmentService.addUniqDepartment(
      dto.department
    );
    const specializationId =
      await this.specializationService.addUniqSpecialization(
        dto.specialization
      );

    return await this.dataBaseService.employee.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        departmentId: departmentId,
        specializationId: specializationId,
      },
    });
  }

  async deleteEmployee(id: number) {
    return this.dataBaseService.employee.delete({ where: { id: id } });
  }
}
