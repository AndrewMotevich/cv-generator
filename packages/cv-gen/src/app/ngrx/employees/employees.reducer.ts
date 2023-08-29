import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as EmployeesActions from './employees.actions';
import { IEmployee } from '../../employees/models/employee.model';

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeesState extends EntityState<IEmployee> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export const employeesAdapter: EntityAdapter<IEmployee> =
  createEntityAdapter<IEmployee>();

export const initialEmployeesState: EmployeesState =
  employeesAdapter.getInitialState({
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
