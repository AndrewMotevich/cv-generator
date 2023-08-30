import { IShared } from '../../shared/interfaces/shared.interfaces';

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

export type ProjectTransformed = Omit<
  IProject,
  'techStack' | 'responsibilities' | 'teamRoles'
> & {
  techStack: string;
  responsibilities: string;
  teamRoles: string;
};

export type ProjectDto = Omit<
  IProject,
  'techStack' | 'responsibilities' | 'teamRoles'
> & {
  techStack: string[];
  responsibilities: string[];
  teamRoles: string[];
};
