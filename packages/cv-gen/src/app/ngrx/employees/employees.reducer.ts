import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as EmployeesActions from './employees.actions';
import { Department, IEmployee, Specialization } from './mock/employees.mock';

export interface EmployeesEntity extends IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  specialization: Specialization;
}

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeesState extends EntityState<EmployeesEntity> {
  selectedId?: string | number; // which Employees record has been selected
  loaded: boolean; // has the Employees list been loaded
  error?: string | null; // last known error (if any)
}

export const employeesAdapter: EntityAdapter<EmployeesEntity> =
  createEntityAdapter<EmployeesEntity>();

export const initialEmployeesState: EmployeesState =
  employeesAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

export const EmployeesReducer = createReducer(
  initialEmployeesState,
  on(EmployeesActions.loadEmployeesSuccess, (state, { employees }) => {
    console.log(employees);
    return employeesAdapter.setAll(employees, { ...state, loaded: true });
  }),
  on(EmployeesActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
