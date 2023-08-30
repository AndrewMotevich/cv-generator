import { IProject } from '../../projects/models/project.model';
import { Language } from '../../shared/interfaces/language.interface';
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
  departmentId: number;
  specializationId: number;

  employeeId: number;
  cvsProjects: IProject[];
}

export interface ICvDto {
  cvName: string;
}
