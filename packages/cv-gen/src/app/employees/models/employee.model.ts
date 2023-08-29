import { IShared } from '../../shared/interfaces/shared.interface';

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  specialization: string;
}

export interface IEmployeeDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: IShared;
  specialization: IShared;
}
