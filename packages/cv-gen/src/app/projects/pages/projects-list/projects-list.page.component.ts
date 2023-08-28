import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IProject } from '../../models/project.model';
import { projectsMock } from '../../../ngrx/projects/mock/projects.mock';
import { IColumns } from '../../../shared/interfaces/shared.interfeces';
import { Router } from '@angular/router';
import {
  CREATE_PROJECTS,
  EDIT_PROJECTS,
  PROJECTS,
} from '../../../shared/constants/routing-paths.consts';
import { ProjectColumns } from '../../constants/project-columns.const';
import { ProjectsApiService } from '../../../shared/services/projects-api.service';

@Component({
  selector: 'cv-gen-project-list.page',
  templateUrl: './projects-list.page.component.html',
  styleUrls: ['./projects-list.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListPageComponent {
  public projects: IProject[] = projectsMock;

  public readonly cols: IColumns[] = ProjectColumns;
  public readonly addProjectPath = PROJECTS.fullPath + CREATE_PROJECTS.fullPath;

  constructor(private router: Router, private projectsService: ProjectsApiService) {
    this.projectsService.getProjects().subscribe(res => console.log(res))
  }

  public navigateToEdit(data: IProject) {
    this.router.navigate([PROJECTS.path, EDIT_PROJECTS.path, data.id]);
  }
}
