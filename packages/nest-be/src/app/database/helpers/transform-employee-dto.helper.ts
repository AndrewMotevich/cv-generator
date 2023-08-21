import { EmployeeDto } from '../../core/employees/dto/employee.dto';

export function transformEmployeeDto(dto: EmployeeDto) {
  return {
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    department: {
      connectOrCreate: {
        where: { name: dto.department.toLowerCase() },
        create: { name: dto.department.toLowerCase() },
      },
    },
    specialization: {
      connectOrCreate: {
        where: { name: dto.specialization.toLowerCase() },
        create: { name: dto.specialization.toLowerCase() },
      },
    },
  };
}
