import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesListPageComponent } from './pages/employees-list/employees-list.page.component';
import { CreateEmployeePageComponent } from './pages/create-employee/create-employee.page.component';
import { EditEmployeePageComponent } from './pages/edit-employee/edit-employee.page.component';

import { BASE, CREATE, EDIT } from '../shared/constants/routing-paths.consts';

const employeesRoutes: Routes = [
  { path: BASE.path, component: EmployeesListPageComponent },
  { path: CREATE.path, component: CreateEmployeePageComponent },
  { path: EDIT.path, component: EditEmployeePageComponent },
  { path: '**', redirectTo: BASE.path, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(employeesRoutes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
