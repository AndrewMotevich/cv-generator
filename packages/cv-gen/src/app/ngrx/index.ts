import { routerReducer } from '@ngrx/router-store';
import { EmployeesEffects } from './employees/employees.effects';
import { EmployeesFacade } from './employees/employees.facade';
import { EmployeesReducer } from './employees/employees.reducer';
import { AuthFacade } from './auth/auth.facade';
import { AuthEffects } from './auth/auth.effects';
import { AuthReducer } from './auth/auth.reducer';
import { CoreFacade } from './core/core.facade';
import { coreReducer } from './core/core.reducer';

export const STORE = {
  routing: routerReducer,
  employees: EmployeesReducer,
  token: AuthReducer,
  core: coreReducer,
};

export const FACADES = [EmployeesFacade, AuthFacade, CoreFacade];

export const EFFECTS = [EmployeesEffects, AuthEffects];
