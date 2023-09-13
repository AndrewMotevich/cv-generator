import { createAction, props } from '@ngrx/store';
import {
  EmployeeDto,
  EmployeeTransformed,
} from '../../employees/models/employee.model';

export const getEmployees = createAction('[Employees/Page] Get Employees');

export const loadEmployeesSuccess = createAction(
  '[Employees/API] Load Employees Success',
  props<{ employees: EmployeeTransformed[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employees/API] Load Employees Failure',
  props<{ error: string }>()
);

//Get selected employee by Id
export const getEmployeeById = createAction(
  '[Employees/Page] Get selected Employee by id',
  props<{ id: number }>()
);

export const loadEmployeeByIdSuccess = createAction(
  '[Employees/API] Load selected Employee by id Success',
  props<{ employee: EmployeeDto }>()
);

export const loadEmployeeByIdFailure = createAction(
  '[Employees/API] Load selected Employee by id Failure',
  props<{ error: string }>()
);

// Add new employee
export const addEmployee = createAction(
  '[Employees/Page] Add Employee',
  props<{ employee: EmployeeDto }>()
);

export const addEmployeeSuccess = createAction(
  '[Employees/API] Add Employee Success'
);

export const addEmployeeFailure = createAction(
  '[Employees/API] Add Employee Failure',
  props<{ error: string }>()
);

// Update employee
export const updateEmployee = createAction(
  '[Employees/Page] Update Employee',
  props<{ id: number; employee: EmployeeDto }>()
);

export const updateEmployeeSuccess = createAction(
  '[Employees/API] Update Employee Success'
);

export const updateEmployeeFailure = createAction(
  '[Employees/API] Update Employee Failure',
  props<{ error: string }>()
);

// Delete employee
export const deleteEmployee = createAction(
  '[Employees/Page] Delete Employee',
  props<{ id: number }>()
);

export const deleteEmployeeSuccess = createAction(
  '[Employees/API] Delete Employee Success'
);

export const deleteEmployeeFailure = createAction(
  '[Employees/API] Delete Employee Failure',
  props<{ error: string }>()
);
