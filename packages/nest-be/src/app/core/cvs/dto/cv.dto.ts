import { IsString } from 'class-validator';

export class CvDto {
  @IsString()
  cvName: string;

  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  department: string;
  @IsString()
  specialization: string;

  employeeId: number;
  language: unknown;
  skills: string[];
  projects: unknown;
  createdAt: unknown;
  updatedAt: unknown;
}
