import { IsEmail, IsString } from 'class-validator';

export class EmployeeDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  department: string;
  specialization: string;
}
