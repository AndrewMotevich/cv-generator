import { IsEmail, IsString } from 'class-validator';
import { Cv } from '../../cvs/dto/cv.dto';
import { Shared } from '../../../shared/shared.dto';

export class Employee {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: Shared;
  specialization?: Shared;
  departmentId?: number;
  specializationId?: number;
  cvs?: Cv[]
}

export class EmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  department: string;

  @IsString()
  specialization: string;
}
