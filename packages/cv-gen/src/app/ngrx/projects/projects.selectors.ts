import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ProjectsState,
  projectsAdapter
} from './projects.reducer';

export const selectProjects = createFeatureSelector<{
  projects: ProjectsState;
}>('common');

export const selectProjectsState = createSelector(
  selectProjects,
  (state) => state.projects
);

const { selectAll, selectEntities } = projectsAdapter.getSelectors();

export const selectProjectsLoaded = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.loaded
);

export const selectProjectsError = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.error
);

export const selectAllProjects = createSelector(
  selectProjectsState,
  (state: ProjectsState) => selectAll(state)
);

export const selectProjectsEntities = createSelector(
  selectProjectsState,
  (state: ProjectsState) => selectEntities(state)
);

export const selectSelectedProject = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.selectedProject
);
