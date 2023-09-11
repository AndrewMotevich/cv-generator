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
  title: 'HEADER.PROJECTS',
  pageInfo: 'BREADCRUMBS.PROJECTS_LIST',
};

export const BREADCRUMB_PROJECT_CREATE = {
  breadcrumbs: [
    {
      label: 'Projects',
      route: PROJECTS.fullPath,
    },
  ],
  title: 'HEADER.PROJECTS',
  pageInfo: 'BREADCRUMBS.PROJECT_CREATE',
};

export const BREADCRUMB_PROJECT_EDIT_FACTORY = (projectInfo: ProjectDto) => ({
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
  title: 'HEADER.PROJECTS',
  pageInfo: `${projectInfo.projectName} project info`,
});
