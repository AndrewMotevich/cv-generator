import { IsArray, IsNumber, IsString } from 'class-validator';
import { Shared } from '../../../shared/shared.dto';
import { Project, ProjectDto } from '../../projects/dto/project.dto';

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

class LanguageDto {
  name: { name: string; }
  level: { name: string; }
}

export class Language {
  id: number;
  // name: { id: number; name: string; }
  // level: { id: number; name: string; }
  nameId: number;
  levelId: number;
}
