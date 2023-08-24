import { routerReducer } from '@ngrx/router-store';
import { EmployeesEffects } from './employees/employees.effects';
import { EmployeesFacade } from './employees/employees.facade';
import { EmployeesReducer } from './employees/employees.reducer';
import { AuthFacade } from './auth/auth.facade';
import { AuthEffects } from './auth/auth.effects';
import { AuthReducer } from './auth/auth.reducer';

export const STORE = {
  routing: routerReducer,
  employees: EmployeesReducer,
  token: AuthReducer
};

export const FACADES = [EmployeesFacade, AuthFacade];

export const EFFECTS = [EmployeesEffects, AuthEffects];
