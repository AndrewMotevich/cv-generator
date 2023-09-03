import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';
import { ProjectDto } from '../../projects/models/project.model';
import { map } from 'rxjs';
import { ProjectsAdapter } from '../../shared/services/projects-adapter.service';

@Injectable()
export class ProjectsFacade {
  private readonly store = inject(Store);

  public loaded$ = this.store.pipe(
    select(ProjectsSelectors.selectProjectsLoaded)
  );

  public projectsList$ = this.store.pipe(
    select(ProjectsSelectors.selectAllProjects)
  );

  public projectsNames$ = this.store.pipe(
    select(ProjectsSelectors.selectAllProjects),
    map((projects) =>
      projects.map((project) => ({
        projectName: project.projectName,
        id: project.id,
      }))
    )
  );

  public selectedProject$ = this.store.pipe(
    select(ProjectsSelectors.selectSelectedProject)
  );

  constructor(private projectsAdapter: ProjectsAdapter) {}

  public loadProjects() {
    this.store.dispatch(ProjectsActions.getProjects());
  }

  public addProject(project: ProjectDto) {
    this.store.dispatch(ProjectsActions.addProject({ project }));
  }

  public loadProjectById(id: number) {
    this.store.dispatch(ProjectsActions.getProjectById({ id }));
  }

  public getProjectById(id: number) {
    return this.projectsList$.pipe(
      map((projects) => projects.find((project) => project.id === id)),
      map((project) => this.projectsAdapter.transformTransformedToDto(project))
    );
  }

  public updateProject(id: number, project: ProjectDto) {
    this.store.dispatch(ProjectsActions.updateProject({ id, project }));
  }

  public deleteProject(id: number) {
    this.store.dispatch(ProjectsActions.deleteProject({ id }));
  }
}
