import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';

import { EmployeesListPageComponent } from './pages/employees-list/employees-list.page.component';
import { CreateEmployeePageComponent } from './pages/create-employee/create-employee.page.component';
import { EditEmployeePageComponent } from './pages/edit-employee/edit-employee.page.component';
import { BaseTable1Component } from '../shared/components/base-table1/base-table1.component';

import { ButtonModule } from 'primeng/button';
import { ProjectFormComponent } from '../shared/components/project-form-cva/project-form-cva.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeesListPageComponent,
    CreateEmployeePageComponent,
    EditEmployeePageComponent,
    CvFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    BaseTable1Component,
    ButtonModule,
    ProjectFormComponent
  ],
})
export class EmployeesModule {}
