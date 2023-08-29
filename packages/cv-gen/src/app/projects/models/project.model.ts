import { Shared } from '../../../../../nest-be/src/app/shared/shared.dto';
export interface IProject {
  id: number;
  projectName: string;
  startDate: Date;
  endDate: Date;
  teamSize: number;
  techStack: string;
  description: string;
  responsibilities: string;
  teamRoles: string;
}

export interface IProjectDto {
  id: number;
  projectName: string;
  startDate: Date;
  endDate: Date;
  teamSize: number;
  techStack: Shared[];
  description: string;
  responsibilities: Shared[];
  teamRoles: Shared[];
}
