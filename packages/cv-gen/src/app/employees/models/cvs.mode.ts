import { IProjectDto } from '../../projects/models/project.model';
import { IShared } from '../../shared/interfaces/shared.interface';

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
  cvsProjects: IProjectDto[];
}

export interface Language {
  id: number;
  level: string;
  name: string;
}
