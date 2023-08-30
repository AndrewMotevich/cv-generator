import { createAction, props } from '@ngrx/store';
import { ProjectDto, ProjectTransformed } from '../../projects/models/project.model';

export const getProjects = createAction('[Projects Page] Get Projects');

export const loadProjectsSuccess = createAction(
  '[Projects/API] Load Projects Success',
  props<{ projects: ProjectTransformed[] }>()
);

export const addProject = createAction(
  '[Projects/API] Add Project',
  props<{ project: ProjectDto }>()
);

export const updateProject = createAction(
  '[Projects/API] Update Project',
  props<{ id: number,  project: ProjectDto}>()
);

export const deleteProject = createAction(
  '[Projects/API] Delete Project',
  props<{ id: number }>()
);


export const loadProjectsFailure = createAction(
  '[Projects/API] Load Projects Failure',
  props<{ error: string }>()
);
