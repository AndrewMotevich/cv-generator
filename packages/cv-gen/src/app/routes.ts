import { Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about/about.page.component';
import { NotFoundPageComponent } from './shared/pages/not-found/not-found.page.component';

import { AuthPageComponent } from './auth/page/auth/auth.page.component';
import { CorePageComponent } from './core/pages/core/core.page.component';

import { ProjectListPageComponent } from './projects/pages/projects-list/projects-list.page.component';
import { CreateProjectPageComponent } from './projects/pages/create-project/create-project.page.component';
import { EditProjectPageComponent } from './projects/pages/edit-project/edit-project.page.component';

import { EmployeesListPageComponent } from './employees/pages/employees-list/employees-list.page.component';
import { CreateEmployeePageComponent } from './employees/pages/create-employee/create-employee.page.component';
import { EditEmployeePageComponent } from './employees/pages/edit-employee/edit-employee.page.component';

export const rootRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  { path: 'about', component: AboutPageComponent },
  { path: '', redirectTo: 'home/projects', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

export const authRoutes: Routes = [{ path: '', component: AuthPageComponent }];

export const homeRoutes: Routes = [
  {
    path: '',
    component: CorePageComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule),
      },
    ],
  },
];

export const projectsRoutes: Routes = [
  { path: 'list', component: ProjectListPageComponent },
  { path: 'create', component: CreateProjectPageComponent },
  { path: 'edit', component: EditProjectPageComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

export const employeesRoutes: Routes = [
  { path: 'list', component: EmployeesListPageComponent },
  { path: 'create', component: CreateEmployeePageComponent },
  { path: 'edit', component: EditEmployeePageComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];
