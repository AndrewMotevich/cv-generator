import { IsArray, IsNumber, IsString } from 'class-validator';
import { Project, ProjectDto } from '../../projects/dto/project.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Shared } from '../../../shared/shared.dto';

export class CvDto {
  @IsString()
  cvName: string;
  @IsArray()
  language: LanguageDto[];
  @IsArray()
  skills: string[];

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

  @IsNumber()
  employeeId: number;
  @IsArray()
  projects: ProjectDto[];
}

export class Cv {
  id: number;
  cvName?: string;
  language?: Language[];
  skills?: Shared[];

  firstName?: string;
  lastName?: string;
  email?: string;
  department?: Shared;
  specialization?: Shared;
  departmentId?: number;
  specializationId?: number;

  employeeId?: number;
  cvsProjects?: Project[];
}

enum Level {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

class LanguageDto {
  name: string;
  @ApiProperty({ enum: Level })
  level: string;
}

class Language {
  id: number;
  name: string;
  level: string;
}
