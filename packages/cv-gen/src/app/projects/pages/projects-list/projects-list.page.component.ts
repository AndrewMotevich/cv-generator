import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IProject } from '../../models/project.model';
import { projectsMock } from '../../../ngrx/projects/mock/projects.mock';
import { IColumns } from '../../../shared/interfaces/shared.interfeces';

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
  ]

  alert(any: unknown){
    alert(any)
  }
}
