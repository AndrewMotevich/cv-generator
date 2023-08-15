import { IsString } from 'class-validator';

export class EmployeeDto {
  @IsString()
  name: string;
  employeeInfo: unknown;
  employeeId: number;
  language: unknown;
  skills: unknown;
  projects: unknown;
  createdAt: unknown;
  updatedAt: unknown;
}
