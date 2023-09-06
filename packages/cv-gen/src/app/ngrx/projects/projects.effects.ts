import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProjectsApiService } from '../../shared/services/projects-api.service';
import * as ProjectsActions from './projects.actions';
import { Router } from '@angular/router';
import { PROJECTS } from '../../shared/constants/routing-paths.consts';
import { ToastMessageService } from '../../shared/services/toast-messages.service';

@Injectable()
export class ProjectsEffects {
  constructor(
    private projectsService: ProjectsApiService,
    private router: Router,
    private errorsService: ToastMessageService
  ) {}

  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.getProjects),
      switchMap(() =>
        this.projectsService.getProjects().pipe(
          map((projects) => ProjectsActions.loadProjectsSuccess({ projects })),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(ProjectsActions.loadProjectsFailure({ error }));
          })
        )
      )
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.getProjectById),
      switchMap((action) =>
        this.projectsService.getProjectById(action.id).pipe(
          map((project) => ProjectsActions.loadProjectByIdSuccess({ project })),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(ProjectsActions.loadProjectsFailure({ error }));
          })
        )
      )
    )
  );

  post$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.addProject),
      switchMap((action) =>
        this.projectsService.addProject(action.project).pipe(
          map(() => ProjectsActions.addProjectSuccess()),
          tap(() => {
            this.router.navigate([PROJECTS.path]);
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(ProjectsActions.addProjectFailure({ error }));
          })
        )
      )
    )
  );

  put$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      switchMap((action) =>
        this.projectsService.updateProject(action.id, action.project).pipe(
          map(() => ProjectsActions.updateProjectSuccess()),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(ProjectsActions.updateProjectFailure({ error }));
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      switchMap((action) =>
        this.projectsService.deleteProject(action.id).pipe(
          map(() => ProjectsActions.deleteProjectSuccess()),
          tap(() => {
            this.router.navigate([PROJECTS.path]);
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(ProjectsActions.deleteProjectFailure({ error }));
          })
        )
      )
    )
  );
}
