import { IsString } from 'class-validator';
import { ProjectDto } from '../../projects/dto/project.dto';

abstract class Language {
  name: string;
  level: string;
}

export class CvDto {
  @IsString()
  cvName: string;
  language: Language[];
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

  employeeId: number;
  projects: ProjectDto[];
}
