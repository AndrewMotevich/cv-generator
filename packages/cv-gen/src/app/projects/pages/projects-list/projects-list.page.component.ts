import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';
import {
  CREATE_PROJECTS,
  EDIT_PROJECTS,
  PROJECTS,
} from '../../../shared/constants/routing-paths.consts';
import { IColumns } from '../../../shared/interfaces/columns.interfeces';
import { ProjectColumns } from '../../constants/project-columns.const';
import { IProject } from '../../models/project.model';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-project-list.page',
  templateUrl: './projects-list.page.component.html',
  styleUrls: ['./projects-list.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListPageComponent implements OnInit {
  public projects: Observable<IProject[]>;

  public readonly cols: IColumns[] = ProjectColumns;
  public readonly addProjectPath = PROJECTS.fullPath + CREATE_PROJECTS.fullPath;

  constructor(private router: Router, private projectsFacade: ProjectsFacade) {}

  public ngOnInit() {
    this.projects = this.projectsFacade.allProjects$;
    this.projectsFacade.getProjects();
  }

  public navigateToEdit(data: IProject) {
    this.router.navigate([PROJECTS.path, EDIT_PROJECTS.path, data.id]);
  }
}
