import { IProject, ProjectDto } from '../../projects/models/project.model';
import {
  Language,
  LanguageDto,
} from '../../shared/interfaces/language.interface';
import { IShared } from '../../shared/interfaces/shared.interfaces';

export interface ICv {
  id: number;
  cvName: string;
  language: Language[];
  skills: IShared[];

  firstName: string;
  lastName: string;
  email: string;
  department: IShared;
  specialization: IShared;

  employeeId: number;
  cvsProjects: IProject[];
}

export type CvDto = Omit<
  ICv,
  'department' | 'specialization' | 'language' | 'skills' | 'cvsProjects'
> & {
  isInvalid?: boolean,
  isNew?: boolean,
  department: string;
  specialization: string;
  skills: string[];
  language: LanguageDto[];
  projects: ProjectDto[];
};
