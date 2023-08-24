import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListPageComponent } from './pages/projects-list/projects-list.page.component';
import { CreateProjectPageComponent } from './pages/create-project/create-project.page.component';
import { EditProjectPageComponent } from './pages/edit-project/edit-project.page.component';

import { BASE, CREATE_PROJECTS, EDIT_PROJECTS, ID } from '../shared/constants/routing-paths.consts';

const projectsRoutes: Routes = [
  { path: BASE.path, component: ProjectListPageComponent },
  { path: CREATE_PROJECTS.path, component: CreateProjectPageComponent },
  { path: EDIT_PROJECTS.path + ID.fullPath, component: EditProjectPageComponent },
  { path: '**', redirectTo: BASE.path, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
