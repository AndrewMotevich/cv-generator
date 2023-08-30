import { IShared } from '../../shared/interfaces/shared.interfaces';

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: IShared;
  specialization: IShared;
}

export type EmployeeTransformed = Omit<
  IEmployee,
  'department' | 'specialization'
> & {
  department: string;
  specialization: string;
};

export type EmployeeDto = Omit<EmployeeTransformed, 'id'>;
