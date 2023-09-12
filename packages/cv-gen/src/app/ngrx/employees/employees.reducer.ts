import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as EmployeesActions from './employees.actions';
import {
  EmployeeDto,
  EmployeeTransformed,
} from '../../employees/models/employee.model';

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeesState extends EntityState<EmployeeTransformed> {
  selectedEmployee: EmployeeDto;
  loaded: boolean;
  error: string | null;
}

export const employeesAdapter: EntityAdapter<EmployeeTransformed> =
  createEntityAdapter<EmployeeTransformed>();

export const initialEmployeesState: EmployeesState =
  employeesAdapter.getInitialState({
    selectedEmployee: null,
    loaded: false,
    error: null,
  });

export const EmployeesReducer = createReducer(
  initialEmployeesState,
  on(EmployeesActions.loadEmployeesSuccess, (state, { employees }) => {
    return employeesAdapter.setAll(employees, state);
  }),
  on(EmployeesActions.loadEmployeeByIdSuccess, (state, { employee }) => {
    return { ...state, selectedEmployee: employee, loaded: true };
  }),

  //
  on(EmployeesActions.setLoadedFalse, (state) => {
    return {...state, loaded: false}
  }),
  on(EmployeesActions.setLoadedTrue, (state) => {
    return {...state, loaded: true}
  }),
);
