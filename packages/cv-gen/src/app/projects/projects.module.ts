import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './projects-routing.module';

import { ProjectListPageComponent } from './pages/projects-list/projects-list.page.component';
import { CreateProjectPageComponent } from './pages/create-project/create-project.page.component';
import { EditProjectPageComponent } from './pages/edit-project/edit-project.page.component';

@NgModule({
  declarations: [
    ProjectListPageComponent,
    CreateProjectPageComponent,
    EditProjectPageComponent,
  ],
  imports: [CommonModule, ProjectRoutingModule, ProjectRoutingModule],
})
export class ProjectsModule {}
