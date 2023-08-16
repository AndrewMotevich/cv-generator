import { IRoutingPath } from '../interfaces/routing-path.interface';

export const BASE: IRoutingPath = {
  path: '',
  fullPath: '',
};

export const AUTH: IRoutingPath = {
  path: 'auth',
  fullPath: '/auth',
};

export const HOME: IRoutingPath = {
  path: '',
  fullPath: '',
};

export const ABOUT: IRoutingPath = {
  path: 'about',
  fullPath: '/about',
};

export const PROJECTS: IRoutingPath = {
  path: 'projects',
  fullPath: '/projects',
};

export const EMPLOYEES: IRoutingPath = {
  path: 'employees',
  fullPath: '/employees',
};

export const CREATE: IRoutingPath = {
  path: 'create',
  fullPath: '/create',
};

export const EDIT: IRoutingPath = {
  path: 'edit/:id',
  fullPath: '/edit/:id',
};
