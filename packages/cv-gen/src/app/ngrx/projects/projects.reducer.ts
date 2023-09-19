import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import {
  ProjectDto,
  ProjectTableData,
} from '../../projects/models/project.model';
import * as ProjectsActions from './projects.actions';

export const PROJECT_FEATURE_KEY = 'projects';

export interface ProjectsState extends EntityState<ProjectTableData> {
  selectedProject: ProjectDto;
  loaded: boolean;
  error: string | null;
}

export const projectsAdapter: EntityAdapter<ProjectTableData> =
  createEntityAdapter<ProjectTableData>();

export const initialProjectsState: ProjectsState =
  projectsAdapter.getInitialState({
    selectedProject: null,
    error: null,
    loaded: true,
  });

export const ProjectsReducer = createReducer(
  initialProjectsState,
  on(ProjectsActions.getProjects, (state) => {
    return { ...state, loaded: false };
  }),
  on(ProjectsActions.loadProjectsSuccess, (state, { projects }) => {
    return projectsAdapter.setAll(projects, { ...state, loaded: true });
  }),
  on(ProjectsActions.loadProjectsFailure, (state) => {
    return { ...state, loaded: true };
  }),

  on(ProjectsActions.getProjectById, (state) => {
    return { ...state, loaded: false };
  }),
  on(ProjectsActions.loadProjectByIdSuccess, (state, { project }) => {
    return { ...state, selectedProject: project, loaded: true };
  }),
  on(ProjectsActions.loadProjectByIdFailure, (state) => {
    return { ...state, loaded: true };
  }),

  on(ProjectsActions.addProject, (state) => {
    return { ...state, loaded: false };
  }),
  on(ProjectsActions.addProjectSuccess, (state) => {
    return { ...state, loaded: true };
  }),
  on(ProjectsActions.addProjectFailure, (state) => {
    return { ...state, loaded: true };
  }),

  on(ProjectsActions.updateProject, (state) => {
    return { ...state, loaded: false };
  }),
  on(ProjectsActions.updateProjectSuccess, (state) => {
    return { ...state, loaded: true };
  }),
  on(ProjectsActions.loadProjectsFailure, (state) => {
    return { ...state, loaded: true };
  }),

  on(ProjectsActions.deleteProject, (state) => {
    return { ...state, loaded: false };
  }),
  on(ProjectsActions.deleteProjectSuccess, (state) => {
    return { ...state, loaded: true };
  }),
  on(ProjectsActions.deleteProjectFailure, (state) => {
    return { ...state, loaded: true };
  }),
);
