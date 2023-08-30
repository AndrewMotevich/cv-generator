import { createAction, props } from '@ngrx/store';
import { IProjectDto, IProjectTransformed } from '../../projects/models/project.model';

export const getProjects = createAction('[Projects Page] Get Projects');

export const loadProjectsSuccess = createAction(
  '[Projects/API] Load Projects Success',
  props<{ projects: IProjectTransformed[] }>()
);

export const addProject = createAction(
  '[Projects/API] Add Project',
  props<{ project: IProjectDto }>()
);

export const updateProject = createAction(
  '[Projects/API] Update Project',
  props<{ id: number,  project: IProjectDto}>()
);

export const deleteProject = createAction(
  '[Projects/API] Delete Project',
  props<{ id: number }>()
);


export const loadProjectsFailure = createAction(
  '[Projects/API] Load Projects Failure',
  props<{ error: string }>()
);
