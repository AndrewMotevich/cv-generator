import { routerReducer } from '@ngrx/router-store';

import { EmployeesEffects } from './employees/employees.effects';
import { EmployeesFacade } from './employees/employees.facade';
import { EmployeesReducer } from './employees/employees.reducer';

import { AuthFacade } from './auth/auth.facade';
import { AuthEffects } from './auth/auth.effects';
import { AuthReducer } from './auth/auth.reducer';

import { CoreFacade } from './core/core.facade';
import { CoreReducer } from './core/core.reducer';

import { ProjectsReducer } from './projects/projects.reducer';
import { ProjectsFacade } from './projects/projects.facade';
import { ProjectsEffects } from './projects/projects.effects';

import { CvsReducer } from './cvs/cvs.reducer';
import { CvsFacade } from './cvs/cvs.facade';
import { CvsEffects } from './cvs/cvs.effects';

export const STORE = {
  routing: routerReducer,
  employees: EmployeesReducer,
  token: AuthReducer,
  core: CoreReducer,
  projects: ProjectsReducer,
  cvs: CvsReducer,
};

export const FACADES = [
  EmployeesFacade,
  AuthFacade,
  CoreFacade,
  ProjectsFacade,
  CvsFacade,
];

export const EFFECTS = [
  EmployeesEffects,
  AuthEffects,
  ProjectsEffects,
  CvsEffects,
];
