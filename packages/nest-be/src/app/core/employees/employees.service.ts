import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Employee, EmployeeDto } from './dto/employee.dto';
import { transformEmployeeDto, transformEmployeePartial } from '../../database/helpers/transform-employee-dto.helper';
import { employeeOutput } from './dto/employee.output';

@Injectable()
export class EmployeesService {
  constructor(private dataBaseService: DatabaseService) {}

  async getEmployees(): Promise<Employee[]> {
    try {
      return await this.dataBaseService.employee.findMany({
        select: employeeOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getEmployeeById(id: number): Promise<Employee> {
    try {
      return await this.dataBaseService.employee.findFirstOrThrow({
        where: { id: id },
        select: employeeOutput,
      });
    } catch (error) {
      if (error.code === "P2025") throw new NotFoundException(error.message)
      throw new BadRequestException(error.message);
    }
  }

  async addEmployee(dto: EmployeeDto): Promise<Employee> {
    try {
      return await this.dataBaseService.employee.create({
        data: transformEmployeeDto(dto),
        select: employeeOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateEmployee(id: number, dto: Partial<EmployeeDto>): Promise<Employee> {
    try {
      return await this.dataBaseService.employee.update({
        where: { id: id },
        data: transformEmployeePartial(dto),
        select: employeeOutput,
      });
    } catch (error) {
      if (error.code === "P2025") throw new NotFoundException(error.message)
      throw new BadRequestException(error.message);
    }
  }

  async deleteEmployee(id: number): Promise<Employee> {
    try {
      return await this.dataBaseService.employee.delete({
        where: { id: id },
        select: employeeOutput,
      });
    } catch (error) {
      if (error.code === "P2025") throw new NotFoundException(error.message)
      throw new BadRequestException(error.message);
    }
  }
}
