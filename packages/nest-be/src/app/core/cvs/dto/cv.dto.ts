import { IsString } from 'class-validator';

export class CvDto {
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
