import { createAction, props } from '@ngrx/store';
import {
  ProjectDto,
  ProjectTransformed
} from '../../projects/models/project.model';

//Get projects
export const getProjects = createAction('[Projects/Page] Get Projects');

export const loadProjectsSuccess = createAction(
  '[Projects/API] Load Projects Success',
  props<{ projects: ProjectTransformed[] }>()
);

export const loadProjectsFailure = createAction(
  '[Projects/API] Load Projects Failure',
  props<{ error: string }>()
);

//Get selected project by Id
export const getProjectById = createAction(
  '[Projects/Page] Get selected Project by id',
  props<{ id: number }>()
);

export const loadProjectByIdSuccess = createAction(
  '[Projects/API] Load selected Project by id Success',
  props<{ project: ProjectDto }>()
);

export const loadProjectByIdFailure = createAction(
  '[Projects/API] Load selected Project by id Failure',
  props<{ error: string }>()
);

// Add new project
export const addProject = createAction(
  '[Projects/Page] Add Project',
  props<{ project: ProjectDto }>()
);

export const addProjectSuccess = createAction(
  '[Projects/API] Add Project Success'
);

export const addProjectFailure = createAction(
  '[Projects/API] Add Project Failure',
  props<{ error: string }>()
);

// Update project
export const updateProject = createAction(
  '[Projects/Page] Update Project',
  props<{ id: number; project: ProjectDto }>()
);

export const updateProjectSuccess = createAction(
  '[Projects/API] Update Project Success'
);

export const updateProjectFailure = createAction(
  '[Projects/API] Update Project Failure',
  props<{ error: string }>()
);

// Delete project
export const deleteProject = createAction(
  '[Projects/Page] Delete Project',
  props<{ id: number }>()
);

export const deleteProjectSuccess = createAction(
  '[Projects/API] Delete Project Success'
);

export const deleteProjectFailure = createAction(
  '[Projects/API] Delete Project Failure',
  props<{ error: string }>()
);
