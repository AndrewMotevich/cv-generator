import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { ProjectDto, ProjectTransformed } from '../../projects/models/project.model';
import * as ProjectsActions from './projects.actions';

export const PROJECT_FEATURE_KEY = 'projects';

export interface ProjectsState extends EntityState<ProjectTransformed> {
  selectedProject?: ProjectDto;
  loaded: boolean;
  error?: string | null;
}

export const projectsAdapter: EntityAdapter<ProjectTransformed> =
  createEntityAdapter<ProjectTransformed>();

export const initialProjectsState: ProjectsState =
  projectsAdapter.getInitialState({
    loaded: false,
  });

export const ProjectsReducer = createReducer(
  initialProjectsState,
  on(ProjectsActions.loadProjectsSuccess, (state, { projects }) => {
    console.log('PROJECTS: ', projects);
    return projectsAdapter.setAll(projects, { ...state, loaded: true });
  }),
  on(ProjectsActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProjectsActions.loadProjectByIdSuccess, (state, { project }) => {
    return {...state, selectedProject: project}
  }),
  on(ProjectsActions.loadProjectByIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
