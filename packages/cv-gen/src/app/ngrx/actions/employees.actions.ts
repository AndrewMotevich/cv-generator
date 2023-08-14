import { createAction, props } from '@ngrx/store';
import { EmployeesEntity } from '../reducers/employees.reducer';

export const initEmployees = createAction('[Employees Page] Init');

export const loadEmployeesSuccess = createAction(
  '[Employees/API] Load Employees Success',
  props<{ employees: EmployeesEntity[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employees/API] Load Employees Failure',
  props<{ error: any }>()
);
