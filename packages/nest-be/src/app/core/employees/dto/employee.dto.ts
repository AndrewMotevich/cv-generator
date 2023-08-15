import { IsEmail, IsString } from 'class-validator';

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  specialization: string;
}

export class EmployeeDto implements Employee {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  department: string;

  specialization: string;
}
