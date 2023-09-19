import { IsArray, IsNumber, IsString } from 'class-validator';
import { Shared } from '../../../shared/shared.dto';

export class ProjectDto {
  @IsString()
  projectName: string;

  @IsString()
  description?: string;

  startDate?: Date;

  endDate?: Date;

  @IsNumber()
  teamSize: number;

  @IsArray()
  techStack: string[];

  @IsArray()
  responsibilities: string[];

  @IsArray()
  teamRoles: string[];
}

export class Project {
  id: number;
  projectName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  teamSize?: number;
  techStack?: Shared[];
  responsibilities?: Shared[];
  teamRoles?: Shared[];
}
