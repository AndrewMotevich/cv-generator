import { createAction, props } from '@ngrx/store';
import { IEmployeeTransformed } from '../../employees/models/employee.model';

export const getEmployees = createAction('[Employees Page] Get Employees');

export const loadEmployeesSuccess = createAction(
  '[Employees/API] Load Employees Success',
  props<{ employees: IEmployeeTransformed[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employees/API] Load Employees Failure',
  props<{ error: string }>()
);
