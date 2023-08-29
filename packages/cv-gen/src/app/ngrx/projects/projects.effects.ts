import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProjectsApiService } from '../../shared/services/projects-api.service';
import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
  constructor(private projectsService: ProjectsApiService) {}

  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.getProjects),
      switchMap(() => this.projectsService.getProjects()),
      map((projects) => ProjectsActions.loadProjectsSuccess({ projects })),
      catchError((error) => {
        console.error('Error', error);
        return of(ProjectsActions.loadProjectsFailure({ error }));
      })
    )
  );
}
