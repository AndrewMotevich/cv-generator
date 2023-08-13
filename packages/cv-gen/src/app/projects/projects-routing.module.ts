import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { projectsRoutes } from '../routes';

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
