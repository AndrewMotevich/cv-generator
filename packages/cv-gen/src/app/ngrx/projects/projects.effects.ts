import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProjectsApiService } from '../../shared/services/projects-api.service';
import * as ProjectsActions from './projects.actions';
import { Router } from '@angular/router';
import { PROJECTS } from '../../shared/constants/routing-paths.consts';

@Injectable()
export class ProjectsEffects {
  constructor(
    private projectsService: ProjectsApiService,
    private router: Router
  ) {}

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

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.getProjectById),
      switchMap((action) => this.projectsService.getProjectById(action.id)),
      map((project) => ProjectsActions.loadProjectByIdSuccess({ project })),
      catchError((error) => {
        console.error('Error', error);
        return of(ProjectsActions.loadProjectsFailure({ error }));
      })
    )
  );

  post$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.addProject),
      switchMap((action) => this.projectsService.addProject(action.project)),
      map(() => ProjectsActions.addProjectSuccess()),
      tap(() => {
        this.router.navigate([PROJECTS.path]);
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ProjectsActions.addProjectFailure({ error }));
      })
    )
  );

  put$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      switchMap((action) =>
        this.projectsService.updateProject(action.id, action.project)
      ),
      map(() => ProjectsActions.updateProjectSuccess()),
      catchError((error) => {
        console.error('Error', error);
        return of(ProjectsActions.updateProjectFailure({ error }));
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      switchMap((action) => this.projectsService.deleteProject(action.id)),
      map(() => ProjectsActions.deleteProjectSuccess()),
      tap(() => {
        this.router.navigate([PROJECTS.path]);
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ProjectsActions.deleteProjectFailure({ error }));
      })
    )
  );
}
