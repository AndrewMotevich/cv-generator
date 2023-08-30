import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';

@Injectable()
export class ProjectsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(ProjectsSelectors.selectProjectsLoaded));

  projectsList$ = this.store.pipe(
    select(ProjectsSelectors.selectAllProjects)
  );

  selectedProject$ = this.store.pipe(select(ProjectsSelectors.selectEntity));

  loadProjects() {
    this.store.dispatch(ProjectsActions.getProjects());
  }
}
