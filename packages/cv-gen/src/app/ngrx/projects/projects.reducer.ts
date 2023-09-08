import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { ProjectDto, ProjectTableData } from '../../projects/models/project.model';
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
    loaded: false,
  });

export const ProjectsReducer = createReducer(
  initialProjectsState,
  on(ProjectsActions.loadProjectsSuccess, (state, { projects }) => {
    return projectsAdapter.setAll(projects, { ...state, loaded: true });
  }),
  on(ProjectsActions.loadProjectByIdSuccess, (state, { project }) => {
    return {...state, selectedProject: project}
  }),
);
