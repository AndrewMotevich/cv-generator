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

export const CREATE_PROJECTS: IRoutingPath = {
  path: 'create',
  fullPath: '/create',
};

export const CREATE_EMPLOYEES: IRoutingPath = {
  path: 'create',
  fullPath: '/create',
};

export const EDIT_PROJECTS: IRoutingPath = {
  path: 'edit',
  fullPath: '/edit',
};

export const EDIT_EMPLOYEES: IRoutingPath = {
  path: 'edit',
  fullPath: '/edit',
};

export const ID: IRoutingPath = {
  path: ':id',
  fullPath: '/:id'
}

export const CV_TO_PDF: IRoutingPath = {
  path: 'cv',
  fullPath: '/cv'
}
