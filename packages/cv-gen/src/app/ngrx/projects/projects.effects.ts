import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PROJECTS as projectUrl } from '../../shared/constants/routing-paths.consts';
import {
  PROJECT,
  PROJECTS,
  VALUES_LOADED_FAILURE,
  VALUES_LOADED_SUCCESS,
  VALUE_ADDED_FAILURE,
  VALUE_ADDED_SUCCESS,
  VALUE_DELETED_FAILURE,
  VALUE_DELETED_SUCCESS,
  VALUE_LOADED_FAILURE,
  VALUE_LOADED_SUCCESS,
  VALUE_UPDATED_FAILURE,
  VALUE_UPDATED_SUCCESS,
} from '../../shared/constants/toasts-messages.consts';
import { ProjectsApiService } from '../../shared/services/projects-api.service';
import { ToastMessageService } from '../../shared/services/toast-messages.service';
import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
  constructor(
    private projectsService: ProjectsApiService,
    private router: Router,
    private messageService: ToastMessageService
  ) {}

  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.getProjects),
      switchMap(() =>
        this.projectsService.getProjects().pipe(
          map((projects) => {
            this.messageService.showSuccessMessage(
              VALUES_LOADED_SUCCESS,
              PROJECTS
            );
            return ProjectsActions.loadProjectsSuccess({ projects });
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(
              VALUES_LOADED_FAILURE,
              PROJECTS
            );
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
          map((project) => {
            this.messageService.showSuccessMessage(
              VALUE_LOADED_SUCCESS,
              PROJECT
            );
            return ProjectsActions.loadProjectByIdSuccess({ project });
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(VALUE_LOADED_FAILURE, PROJECT);
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
          map(() => {
            this.messageService.showSuccessMessage(
              VALUE_ADDED_SUCCESS,
              PROJECT
            );
            return ProjectsActions.addProjectSuccess();
          }),
          tap(() => {
            this.router.navigate([projectUrl.path]);
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(VALUE_ADDED_FAILURE, PROJECT);
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
          map(() => {
            this.messageService.showSuccessMessage(
              VALUE_UPDATED_SUCCESS,
              PROJECT
            );
            return ProjectsActions.updateProjectSuccess();
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(
              VALUE_UPDATED_FAILURE,
              PROJECT
            );
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
          map(() => {
            this.messageService.showSuccessMessage(
              VALUE_DELETED_SUCCESS,
              PROJECT
            );
            return ProjectsActions.deleteProjectSuccess();
          }),
          tap(() => {
            this.router.navigate([projectUrl.path]);
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(
              VALUE_DELETED_FAILURE,
              PROJECT
            );
            return of(ProjectsActions.deleteProjectFailure({ error }));
          })
        )
      )
    )
  );
}
