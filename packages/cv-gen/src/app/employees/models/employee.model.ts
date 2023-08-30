import { IShared } from '../../shared/interfaces/shared.interfaces';

export interface IEmployeeTransformed {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  specialization: string;
}

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: IShared;
  specialization: IShared;
}

export interface IEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  specialization: string
}
