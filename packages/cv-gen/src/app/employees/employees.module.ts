import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeesRoutingModule } from './employees-routing.module';

import { BaseTable1Component } from '../shared/components/base-table1/base-table1.component';
import { ProjectFormComponent } from '../shared/components/project-form-cva/project-form-cva.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';
import { CvsSidebarComponent } from './components/cvs-sidebar/cvs-sidebar.component';
import { EmployeeInfoFormComponent } from './components/employee-info-form/employee-info-form.component';
import { CreateEmployeePageComponent } from './pages/create-employee/create-employee.page.component';
import { EditEmployeePageComponent } from './pages/edit-employee/edit-employee.page.component';
import { EmployeesListPageComponent } from './pages/employees-list/employees-list.page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';

import {
  ChipsInputModule,
  SelectInputModule,
  TextInputModule,
} from '@cva/my-cva-lib';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageAccordionComponent } from './components/language-accordion/language-accordion.component';
import { ProjectsAccordionComponent } from './components/projects-accordion/projects-accordion.component';

@NgModule({
  declarations: [
    EmployeesListPageComponent,
    CreateEmployeePageComponent,
    EditEmployeePageComponent,
    CvFormComponent,
    EmployeeInfoFormComponent,
    CvsSidebarComponent,
    CvFormComponent,
    LanguageAccordionComponent,
    ProjectsAccordionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    BaseTable1Component,
    ProjectFormComponent,
    TranslateModule,
    ButtonModule,
    AutoCompleteModule,
    DividerModule,
    TabViewModule,
    TextInputModule,
    ChipsInputModule,
    SelectInputModule,
    AccordionModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
  ],
})
export class EmployeesModule {}
