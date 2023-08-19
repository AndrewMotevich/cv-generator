import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './projects-routing.module';

import { ProjectListPageComponent } from './pages/projects-list/projects-list.page.component';
import { CreateProjectPageComponent } from './pages/create-project/create-project.page.component';
import { EditProjectPageComponent } from './pages/edit-project/edit-project.page.component';
import { BaseTable2Component } from '../shared/components/base-table2/base-table2.component';
import { ProjectFormComponent } from '../shared/components/project-form-cva/project-form-cva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProjectListPageComponent,
    CreateProjectPageComponent,
    EditProjectPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    ProjectRoutingModule,
    BaseTable2Component,
    ProjectFormComponent
  ],
})
export class ProjectsModule {}
