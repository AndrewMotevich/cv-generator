import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import { ProjectTransformed } from '../../projects/models/project.model';

export const PROJECT_FEATURE_KEY = 'projects';

export interface ProjectsState extends EntityState<ProjectTransformed> {
  selectedId?: string | number;
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
  }))
);
