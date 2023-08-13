import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';

import { EmployeesListPageComponent } from './pages/employees-list/employees-list.page.component';
import { CreateEmployeePageComponent } from './pages/create-employee/create-employee.page.component';
import { EditEmployeePageComponent } from './pages/edit-employee/edit-employee.page.component';

@NgModule({
  declarations: [
    EmployeesListPageComponent,
    CreateEmployeePageComponent,
    EditEmployeePageComponent,
  ],
  imports: [CommonModule, EmployeesRoutingModule],
})
export class EmployeesModule {}
