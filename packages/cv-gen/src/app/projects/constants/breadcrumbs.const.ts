import {
  EDIT_PROJECTS,
  PROJECTS,
} from '../../shared/constants/routing-paths.consts';
import { ProjectDto } from '../models/project.model';

export const BREADCRUMB_PROJECT_LIST = {
  breadcrumbs: [
    {
      label: 'Projects',
      route: PROJECTS.fullPath,
    },
  ],
  title: 'Projects',
  pageInfo: 'Projects list',
};

export const BREADCRUMB_PROJECT_CREATE = {
  breadcrumbs: [
    {
      label: 'Projects',
      route: PROJECTS.fullPath,
    },
  ],
  title: 'Projects',
  pageInfo: 'Create Project',
};

export const BREADCRUMB_PROJECT_EDIT = (projectInfo: ProjectDto) => ({
  breadcrumbs: [
    {
      label: 'Projects',
      route: PROJECTS.fullPath,
    },
    {
      label: `${projectInfo.projectName}`,
      route: PROJECTS.fullPath + EDIT_PROJECTS.fullPath + '/' + projectInfo.id,
    },
  ],
  title: 'Projects',
  pageInfo: `${projectInfo.projectName} project info`,
});
