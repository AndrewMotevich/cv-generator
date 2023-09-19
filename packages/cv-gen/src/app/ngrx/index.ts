import { combineReducers } from '@ngrx/store';

import { EmployeesEffects } from './employees/employees.effects';
import { EmployeesFacade } from './employees/employees.facade';
import { EmployeesReducer } from './employees/employees.reducer';

import { AuthEffects } from './auth/auth.effects';
import { AuthFacade } from './auth/auth.facade';
import { AuthReducer } from './auth/auth.reducer';

import { CoreFacade } from './core/core.facade';
import { CoreReducer } from './core/core.reducer';

import { ProjectsEffects } from './projects/projects.effects';
import { ProjectsFacade } from './projects/projects.facade';
import { ProjectsReducer } from './projects/projects.reducer';

import { CvsEffects } from './cvs/cvs.effects';
import { CvsFacade } from './cvs/cvs.facade';
import { CvsReducer } from './cvs/cvs.reducer';
import { SharedEffects } from './shared/shared.effects';
import { SharedFacade } from './shared/shared.facade';
import { SharedReducer } from './shared/shared.reducer';

export const STORE = {
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
