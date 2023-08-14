import { routerReducer } from '@ngrx/router-store';
import { EmployeesEffects } from './employees/employees.effects';
import { EmployeesFacade } from './employees/employees.facade';
import { EmployeesReducer } from './employees/employees.reducer';

export const STORE = {
  routing: routerReducer,
  employees: EmployeesReducer,
};

export const FACADES = [EmployeesFacade];

export const EFFECTS = [EmployeesEffects];
