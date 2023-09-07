import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorePageComponent } from './pages/core/core.page.component';
import {
  BASE,
  EMPLOYEES,
  PROJECTS,
} from '../shared/constants/routing-paths.consts';
import { authGuard } from '../shared/guards/auth.guard';

const homeRoutes: Routes = [
  {
    path: BASE.path,
    redirectTo: EMPLOYEES.path,
    pathMatch: 'full',
  },
  {
    path: BASE.path,
    component: CorePageComponent,
    children: [
      {
        path: PROJECTS.path,
        loadChildren: () =>
          import('../projects/projects.module').then((m) => m.ProjectsModule),
        canMatch: [authGuard],
        data: {
          title: "projects"
        }
      },
      {
        path: EMPLOYEES.path,
        loadChildren: () =>
          import('../employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
        canMatch: [authGuard],
        data: {
          title: "employees"
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
