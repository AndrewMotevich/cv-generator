import { routerReducer } from '@ngrx/router-store';
import { combineReducers } from '@ngrx/store';

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
import { SharedReducer } from './shared/shared.reducer';
import { SharedFacade } from './shared/shared.facade';
import { SharedEffects } from './shared/shared.effects';

export const STORE = {
  router: routerReducer,
  common: combineReducers({
    employees: EmployeesReducer,
    projects: ProjectsReducer,
    cvs: CvsReducer,
    shared: SharedReducer,
  }),
  core: combineReducers({
    token: AuthReducer,
    core: CoreReducer,
  }),
};

export const FACADES = [
  EmployeesFacade,
  AuthFacade,
  CoreFacade,
  ProjectsFacade,
  CvsFacade,
  SharedFacade,
];

export const EFFECTS = [
  EmployeesEffects,
  AuthEffects,
  ProjectsEffects,
  CvsEffects,
  SharedEffects,
];
