import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorePageComponent } from './pages/core/core.page.component';
import {
  BASE,
  EMPLOYEES,
  PROJECTS,
} from '../shared/constants/routing-paths.consts';

const homeRoutes: Routes = [
  {
    path: BASE.path,
    component: CorePageComponent,
    children: [
      {
        path: PROJECTS.path,
        loadChildren: () =>
          import('../projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: EMPLOYEES.path,
        loadChildren: () =>
          import('../employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
