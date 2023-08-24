import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IProject } from '../../models/project.model';
import { projectsMock } from '../../../ngrx/projects/mock/projects.mock';
import { IColumns } from '../../../shared/interfaces/shared.interfeces';
import { Router } from '@angular/router';
import { EDIT, PROJECTS } from '../../../shared/constants/routing-paths.consts';

@Component({
  selector: 'cv-gen-project-list.page',
  templateUrl: './projects-list.page.component.html',
  styleUrls: ['./projects-list.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListPageComponent {
  projects: IProject[] = projectsMock
  cols: IColumns[] = [
    {field: "id", header: "Id"},
    {field: "projectName", header: "Project Name"},
    {field: "description", header: "Description"},
  ]

  constructor(private router: Router){}

  navigate(data: IProject){
    this.router.navigate([PROJECTS.path, EDIT.path, data.id])
  }
}
