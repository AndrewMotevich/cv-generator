import { createAction, props } from '@ngrx/store';
import { IProject } from '../../projects/models/project.model';

export const getProjects = createAction('[Projects Page] Get Projects');

export const loadProjectsSuccess = createAction(
  '[Projects/API] Load Projects Success',
  props<{ projects: IProject[] }>()
);

export const loadProjectsFailure = createAction(
  '[Projects/API] Load Projects Failure',
  props<{ error: string }>()
);
