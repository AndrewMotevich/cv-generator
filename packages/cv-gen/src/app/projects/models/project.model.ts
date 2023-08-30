import { IShared } from "../../shared/interfaces/shared.interfaces";
export interface IProjectTransformed {
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

export interface IProject {
  id: number;
  projectName: string;
  startDate: Date;
  endDate: Date;
  teamSize: number;
  techStack: IShared[];
  description: string;
  responsibilities: IShared[];
  teamRoles: IShared[];
}

export interface IProjectDto {
  projectName: string;
  startDate: Date;
  endDate: Date;
  teamSize: number;
  techStack: string[];
  description: string;
  responsibilities: string[];
  teamRoles: string[];
}
